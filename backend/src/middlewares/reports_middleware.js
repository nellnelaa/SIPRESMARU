const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateGetReports = async (req, res, next) => {
  const validateQuery = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    text: z.string().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

const validateGetReportById = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};

const validateCreateReport = async (req, res, next) => {
  const validateBody = z.object({
    name: z.string(),
    email: z.string().email(),
    text: z.string(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};

const validateUpdateReport = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({
    name: z.string(),
    email: z.string().email(),
    text: z.string(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

const validateDeleteReport = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

module.exports = {
  validateGetReports,
  validateGetReportById,
  validateCreateReport,
  validateUpdateReport,
  validateDeleteReport,
};
