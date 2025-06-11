const { successResponse } = require("../utils/response.js");
const {
  getDashboardStatsService,
} = require("../services/dashboard_service.js");

const getDashboardStatsController = async (req, res) => {
  const { period, class_name, category } = req.query;

  const data = await getDashboardStatsService({ period, class_name, category });

  const message = "Dashboard statistics retrieved successfully";
  successResponse(res, data, message);
};

module.exports = {
  getDashboardStatsController,
};
