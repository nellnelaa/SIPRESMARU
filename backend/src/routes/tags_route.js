const express = require("express");
const { authorization } = require("../middlewares/auth_middleware.js");
const {
  validateGetTags,
  validateGetTagById,
  validateCreateTag,
  validateUpdateTag,
  validateDeleteTag,
} = require("../middlewares/tags_middleware.js");
const {
  getTagsController,
  getTagByIdController,
  createTagController,
  updateTagController,
  deleteTagController,
} = require("../controllers/tags_controller.js");
const { adminRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(validateGetTags, getTagsController)
  .post(authorization(adminRole), validateCreateTag, createTagController);

router
  .route("/:id")
  .get(validateGetTagById, getTagByIdController)
  .put(authorization(adminRole), validateUpdateTag, updateTagController)
  .delete(authorization(adminRole), validateDeleteTag, deleteTagController);

module.exports = router;
