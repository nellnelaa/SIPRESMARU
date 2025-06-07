const express = require("express");
const {
  validateGetLeaderboards,
} = require("../middlewares/leaderboards_middleware.js");
const {
  getLeaderboardsController,
} = require("../controllers/leaderboards_controller.js");

const router = express.Router();

// router.get("/", validateGetLeaderboards, getLeaderboardsController);

router
  .route("/")
  .get(validateGetLeaderboards, getLeaderboardsController)

module.exports = router;
