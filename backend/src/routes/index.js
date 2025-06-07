const express = require("express");
const authRouter = require("./auth_route");
const studentsRouter = require("./students_route");
const tagsRouter = require("./tags_route");
const achievementsRouter = require("./achievements_route");
const categoriesRouter = require("./categories_route");
const reportsRouter = require("./reports_route");
const leaderboardsRouter = require("./leaderboards_route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/students", studentsRouter);
router.use("/tags", tagsRouter);
router.use("/achievements", achievementsRouter);
router.use("/categories", categoriesRouter);
router.use("/reports", reportsRouter);
router.use("/leaderboards", leaderboardsRouter);

module.exports = router;
