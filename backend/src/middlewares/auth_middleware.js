const { z } = require("zod");
const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  Unauthorized,
  Forbidden,
} = require("../utils/request");
const userRepository = require("../repositories/users_repository");

exports.authorization =
  (...roles) =>
  async (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new Unauthorized("You need to login in advance!");
    }

    const splittedAuthHeader = authorizationHeader.split(" ");
    if (splittedAuthHeader.length <= 1) {
      throw new Unauthorized("Token is not valid!");
    }

    const token = splittedAuthHeader[1];

    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepository.getUserById(extractedToken.user_id);

    if (!user) {
      throw new Unauthorized("User not found or token is invalid!");
    }
  
    const accessValidation = roles.includes(user.role_id);
    if (!accessValidation) {
      throw new Forbidden("You can not access this resource!");
    }

    req.user = user;

    next();
  };

exports.validateRegister = (req, res, next) => {
  const validateBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const validateFileBody = z
    .object({
      profile_picture: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  const validateBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};
