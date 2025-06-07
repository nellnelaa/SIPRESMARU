const {
  getLeaderboardsRepo,
} = require("../repositories/leaderboards_repository");

const getLeaderboardsService = async (query) => {
  return await getLeaderboardsRepo(query);
};

module.exports = {
  getLeaderboardsService,
};
