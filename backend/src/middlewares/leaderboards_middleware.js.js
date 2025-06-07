const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateGetLeaderboards = (req, res, next) => {
  const schema = z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    full_name: z.string().optional(),
    title: z.string().optional(),
    organizer_name: z.string().optional(),
    category_type: z.enum(["AKADEMIK", "NON_AKADEMIK"]).optional(),
    grade: z.string().optional(),
  });

  const parsed = schema.safeParse(req.query);
  if (!parsed.success) {
    throw new BadRequestError(parsed.error.errors);
  }

  next();
};

module.exports = {
  validateGetLeaderboards,
};
