const { successResponse } = require("../utils/response.js");
const {
    getReportsService,
    getReportByIdService,
    createReportService,updateReportService,deleteReportService,
} = require("../services/reports_service.js");

const getReportsController = async (req, res) => {
  const { name, email, text } = req.query;

  const data = await getReportsService(name, email, text);

  const message =
    data.length === 0
      ? "Report tidak ditemukan."
      : "Request berhasil";
  successResponse(res, data, message);
};

const getReportByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getReportByIdService(id);
  successResponse(res, data);
};

const createReportController = async (req, res) => {
  const { body } = req;
  const data = await createReportService(body);
  successResponse(res, data);
};

const updateReportController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const data = await updateReportService(id, body);
  if (!data) throw new BadRequestError("Missing update data.");
  successResponse(res, data);
};

const deleteReportController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteReportService(id);
  successResponse(res, data);
};

module.exports = {
  getReportsController,
  getReportByIdController,
  createReportController,
  updateReportController,
  deleteReportController,
};
