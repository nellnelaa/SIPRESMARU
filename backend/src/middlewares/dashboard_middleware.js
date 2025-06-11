const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateGetDashboardStats = async (req, res, next) => {
  const validateQuery = z.object({
    period: z.enum(["month", "quarter", "year"]).optional().default("month"),
    class_name: z.enum(["grade_10", "grade_11", "grade_12"]).optional(),
    category: z.enum(["Academic", "Non_Academic"]).optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

module.exports = {
  validateGetDashboardStats,
};
