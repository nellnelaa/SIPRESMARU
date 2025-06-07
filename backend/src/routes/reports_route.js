const express = require("express");
const {
  validateGetReports,
  validateGetReportById,
  validateCreateReport,
  validateUpdateReport,
  validateDeleteReport,
} = require("../middlewares/reports_middleware.js");
const {
  getReportsController, 
  getReportByIdController,
  createReportController,
  updateReportController,
  deleteReportController,
} = require("../controllers/reports_controller.js");

const router = express.Router();

router
  .route("/")
  .get(validateGetReports, getReportsController)
  .post(validateCreateReport, createReportController);

router
  .route("/:id")
  .get(validateGetReportById, getReportByIdController)
  .put(validateUpdateReport, updateReportController)
  .delete(validateDeleteReport, deleteReportController);

module.exports = router;
