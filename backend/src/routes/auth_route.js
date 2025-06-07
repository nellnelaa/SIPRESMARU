const express = require("express");
const {
  validateRegister,
  validateLogin,
  authorization,
} = require("../middlewares/auth_middleware");
const { register, login, getProfile } = require("../controllers/auth_controller.js");
const { staff, osis } = require("../constants/auth");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/profile", authorization(staff, osis), getProfile);

module.exports = router;
