const {
  getDashboardStatsRepo,
  getStudentsStatsRepo,
  getAchievementsStatsRepo,
  getClassSummaryRepo,
  getRecentAchievementsRepo,
  getCategoryStatsRepo,
  getSocialMediaStatsRepo,
} = require("../repositories/dashboard_repository.js");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../utils/request.js");

const getDashboardStatsService = async (filters) => {
  try {
    const { period, class_name, category } = filters;

    // Get all dashboard statistics
    const [
      studentsStats,
      achievementsStats,
      classSummary,
      recentAchievements,
      categoryStats,
      socialMediaStats,
    ] = await Promise.all([
      getStudentsStatsRepo(period, class_name),
      getAchievementsStatsRepo(period, category),
      getClassSummaryRepo(),
      getRecentAchievementsRepo(),
      getCategoryStatsRepo(period),
      getSocialMediaStatsRepo(period),
    ]);

    return {
      overview: {
        students: studentsStats,
        achievements: achievementsStats,
        socialShares: socialMediaStats,
      },
      breakdown: {
        byClass: classSummary,
        byCategory: categoryStats,
      },
      recent: {
        achievements: recentAchievements,
      },
      period: period || "month",
      filters: {
        class_name,
        category,
      },
    };
  } catch (error) {
    console.error("Dashboard service error:", error);
    throw new InternalServerError("Failed to retrieve dashboard statistics");
  }
};

module.exports = {
  getDashboardStatsService,
};
