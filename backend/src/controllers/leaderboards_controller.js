const {
  getLeaderboardsService,
} = require("../services/leaderboards_service.js");
const { successResponse } = require("../utils/response");

const getLeaderboardsController = async (req, res) => {
  const leaderboards = await getLeaderboardsService(req.query);
  successResponse(res, leaderboards, "Berhasil mengambil leaderboard");
};

module.exports = {
  getLeaderboardsController,
};
