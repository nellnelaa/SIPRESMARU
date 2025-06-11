const express = require("express");
const { authorization } = require("../middlewares/auth_middleware.js");
const {
  validateGetDashboardStats,
} = require("../middlewares/dashboard_middleware.js");
const {
  getDashboardStatsController,
} = require("../controllers/dashboard_controller.js");
const { adminRole } = require("../constants/auth.js");

const router = express.Router();

router
  .route("/")
  .get(
    authorization(adminRole),
    validateGetDashboardStats,
    getDashboardStatsController
  );

module.exports = router;
