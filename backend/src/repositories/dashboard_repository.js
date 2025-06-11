const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

// Helper function to get date ranges
const getDateRange = (period) => {
  const now = new Date();
  let currentPeriodStart, previousPeriodStart, previousPeriodEnd;

  switch (period) {
    case "year":
      currentPeriodStart = new Date(now.getFullYear(), 0, 1);
      previousPeriodStart = new Date(now.getFullYear() - 1, 0, 1);
      previousPeriodEnd = new Date(now.getFullYear(), 0, 1);
      break;
    case "quarter":
      const currentQuarter = Math.floor(now.getMonth() / 3);
      currentPeriodStart = new Date(now.getFullYear(), currentQuarter * 3, 1);
      previousPeriodStart = new Date(
        now.getFullYear(),
        (currentQuarter - 1) * 3,
        1
      );
      previousPeriodEnd = currentPeriodStart;
      break;
    default: // month
      currentPeriodStart = new Date(now.getFullYear(), now.getMonth(), 1);
      previousPeriodStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      previousPeriodEnd = currentPeriodStart;
  }

  return { currentPeriodStart, previousPeriodStart, previousPeriodEnd };
};

// Helper function to calculate percentage change
const calculateChange = (current, previous) => {
  if (previous === 0) return current > 0 ? "+100%" : "0%";
  const change = (((current - previous) / previous) * 100).toFixed(0);
  return change > 0 ? `+${change}%` : `${change}%`;
};

const getStudentsStatsRepo = async (period = "month", class_name = null) => {
  const { currentPeriodStart, previousPeriodStart, previousPeriodEnd } =
    getDateRange(period);

  let whereClause = {};
  if (class_name) {
    whereClause.class_name = class_name;
  }

  const [totalStudents, currentPeriodStudents, previousPeriodStudents] =
    await Promise.all([
      // Total students
      prisma.students.count({ where: whereClause }),

      // Students in current period (assuming you add created_at field to students)
      prisma.students.count({
        where: {
          ...whereClause,
          // Note: You might need to add created_at field to students table
          // created_at: { gte: currentPeriodStart }
        },
      }),

      // Students in previous period
      prisma.students.count({
        where: {
          ...whereClause,
          // created_at: { gte: previousPeriodStart, lt: previousPeriodEnd }
        },
      }),
    ]);

  const result = {
    total: totalStudents,
    currentPeriod: currentPeriodStudents,
    previousPeriod: previousPeriodStudents,
    change: calculateChange(currentPeriodStudents, previousPeriodStudents),
    period,
  };

  const serializedResult = JSONBigInt.stringify(result);
  return JSONBigInt.parse(serializedResult);
};

const getAchievementsStatsRepo = async (period = "month", category = null) => {
  const { currentPeriodStart, previousPeriodStart, previousPeriodEnd } =
    getDateRange(period);

  let whereClause = {};
  if (category) {
    whereClause.category_type = category;
  }

  const [
    totalAchievements,
    currentPeriodAchievements,
    previousPeriodAchievements,
  ] = await Promise.all([
    // Total achievements
    prisma.achievements.count({ where: whereClause }),

    // Achievements in current period
    prisma.achievements.count({
      where: {
        ...whereClause,
        created_at: { gte: currentPeriodStart },
      },
    }),

    // Achievements in previous period
    prisma.achievements.count({
      where: {
        ...whereClause,
        created_at: { gte: previousPeriodStart, lt: previousPeriodEnd },
      },
    }),
  ]);

  const result = {
    total: totalAchievements,
    currentPeriod: currentPeriodAchievements,
    previousPeriod: previousPeriodAchievements,
    change: calculateChange(
      currentPeriodAchievements,
      previousPeriodAchievements
    ),
    period,
  };

  const serializedResult = JSONBigInt.stringify(result);
  return JSONBigInt.parse(serializedResult);
};

const getClassSummaryRepo = async () => {
  const classCounts = await prisma.students.groupBy({
    by: ["class_name"],
    _count: {
      id: true,
    },
    where: {
      class_name: {
        not: null,
      },
    },
  });

  const result = classCounts.map((item) => ({
    className: item.class_name,
    count: item._count.id,
  }));

  const serializedResult = JSONBigInt.stringify(result);
  return JSONBigInt.parse(serializedResult);
};

const getRecentAchievementsRepo = async (limit = 5) => {
  const recentAchievements = await prisma.achievements.findMany({
    take: limit,
    orderBy: {
      created_at: "desc",
    },
    include: {
      students: {
        select: {
          full_name: true,
          class_name: true,
          NIS: true,
        },
      },
    },
  });

  const serializedResult = JSONBigInt.stringify(recentAchievements);
  return JSONBigInt.parse(serializedResult);
};

const getCategoryStatsRepo = async (period = "month") => {
  const { currentPeriodStart } = getDateRange(period);

  const categoryStats = await prisma.achievements.groupBy({
    by: ["category_type"],
    _count: {
      id: true,
    },
    where: {
      created_at: { gte: currentPeriodStart },
    },
  });

  const result = categoryStats.map((item) => ({
    category: item.category_type,
    count: item._count.id,
  }));

  const serializedResult = JSONBigInt.stringify(result);
  return JSONBigInt.parse(serializedResult);
};

const getSocialMediaStatsRepo = async (period = "month") => {
  const { currentPeriodStart, previousPeriodStart, previousPeriodEnd } =
    getDateRange(period);

  const [totalShares, currentPeriodShares, previousPeriodShares] =
    await Promise.all([
      // Total social media shares
      prisma.social_media_shares.count(),

      // Shares in current period
      prisma.social_media_shares.count({
        where: {
          shared_at: { gte: currentPeriodStart },
        },
      }),

      // Shares in previous period
      prisma.social_media_shares.count({
        where: {
          shared_at: { gte: previousPeriodStart, lt: previousPeriodEnd },
        },
      }),
    ]);

  // Platform breakdown
  const platformStats = await prisma.social_media_shares.groupBy({
    by: ["platform"],
    _count: {
      id: true,
    },
    where: {
      shared_at: { gte: currentPeriodStart },
    },
  });

  const result = {
    total: totalShares,
    currentPeriod: currentPeriodShares,
    previousPeriod: previousPeriodShares,
    change: calculateChange(currentPeriodShares, previousPeriodShares),
    platforms: platformStats.map((item) => ({
      platform: item.platform,
      count: item._count.id,
    })),
    period,
  };

  const serializedResult = JSONBigInt.stringify(result);
  return JSONBigInt.parse(serializedResult);
};

module.exports = {
  getStudentsStatsRepo,
  getAchievementsStatsRepo,
  getClassSummaryRepo,
  getRecentAchievementsRepo,
  getCategoryStatsRepo,
  getSocialMediaStatsRepo,
};
