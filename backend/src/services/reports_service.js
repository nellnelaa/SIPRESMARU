const {
  getReportsRepo,
  getReportByIdRepo,
  createReportRepo,
  updateReportRepo,
  deleteReportRepo,
} = require("../repositories/reports_repository.js");
const {
  BadRequestError, 
  NotFoundError,
  InternalServerError,
} = require("../utils/request.js");

const getReportsService = async (name, email, text) => {
  return getReportsRepo(name, email, text);
};

const getReportByIdService = async (id) => {
  const data = await getReportByIdRepo(id);
  if (!data) {
    throw new NotFoundError("Report is not found!");
  }
  return data;
};

const createReportService = async (data) => {
  const newReport = await createReportRepo(data);
  return newReport;
};

const updateReportService = async (id, data) => {
  const existingReport = await getReportByIdRepo(id);
  if (!existingReport) {
    throw new NotFoundError("Report is not found!");
  }

  const updatedReport = await updateReportRepo(id, data);
  if (!updatedReport) {
    throw new InternalServerError("Failed to update Report");
  }

  return updatedReport;
};

const deleteReportService = async (id) => {
  const existingReport = await getReportByIdRepo(id);
  if (!existingReport) {
    throw new NotFoundError("Report data is not found!");
  }

  const deletedReport = await deleteReportRepo(id);
  if (!deletedReport) {
    throw new InternalServerError("Failed to delete spec");
  }

  return deletedReport;
};

module.exports = {
  getReportsService,
  getReportByIdService,
  createReportService,
  updateReportService,
  deleteReportService,
};
