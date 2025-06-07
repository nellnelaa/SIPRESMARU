const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const getLeaderboardsRepo = async (query) => {
  const {
    page = 1,
    limit = 10,
    full_name,
    title,
    organizer_name,
    category_type,
    grade,
  } = query;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const filter = {
    achievements: {
      some: {
        ...(title && { title: { contains: title, mode: "insensitive" } }),
        ...(organizer_name && {
          organizer_name: { contains: organizer_name, mode: "insensitive" },
        }),
        ...(category_type && { category_type }),
        ...(grade && { grade }),
      },
    },
    ...(full_name && {
      full_name: { contains: full_name, mode: "insensitive" },
    }),
  };

  const [students, total] = await Promise.all([
    prisma.students.findMany({
      where: filter,
      select: {
        id: true,
        full_name: true,
        achievements: {
          select: { points: true },
        },
      },
      skip,
      take,
    }),

    prisma.students.count({
      where: filter,
    }),
  ]);

  const leaderboardData = students.map((student) => ({
    id: student.id,
    full_name: student.full_name,
    total_points: student.achievements.reduce(
      (sum, a) => sum + (a.points || 0),
      0
    ),
  }));

  leaderboardData.sort((a, b) => b.total_points - a.total_points);

  return JSONBigInt.parse(
    JSONBigInt.stringify({
      data: leaderboardData,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    })
  );
};

module.exports = {
  getLeaderboardsRepo,
};
