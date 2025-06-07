const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const getReportsRepo = async (name, email, text) => {
  let query = {};

  let andQuery = [];

  if (name) {
    andQuery.push({
      name: { contains: name, mode: "insensitive" },
    });
  }
  if (email) {
    andQuery.push({
      email: { contains: email, mode: "insensitive" },
    });
  }
  if (text) {
    andQuery.push({
      text: { contains: text, mode: "insensitive" },
    });
  }

  if (andQuery.length > 0) {
    query.where = {
      AND: andQuery,
    };
  }

  const searchedReports = await prisma.report.findMany(query);

  const serializedReports = JSONBigInt.stringify(searchedReports);
  return JSONBigInt.parse(serializedReports);
};

const getReportByIdRepo = async (id) => {
  const report = await prisma.report.findFirst({
    where: {
      id: id,
    },
  });
  const serializedReports = JSONBigInt.stringify(report);
  return JSONBigInt.parse(serializedReports);
};

const createReportRepo = async (data) => {
  const newReport = await prisma.report.create({
    data,
  });

  const serializedReports = JSONBigInt.stringify(newReport);
  return JSONBigInt.parse(serializedReports);
};

const updateReportRepo = async (id, data) => {
  const updatedReport = await prisma.report.update({
    where: { id },
    data,
  });

  const serializedReports = JSONBigInt.stringify(updatedReport);
  return JSONBigInt.parse(serializedReports);
};

const deleteReportRepo = async (id) => {
  const deletedReport = await prisma.report.delete({
    where: { id },
  });

  const serializedReports = JSONBigInt.stringify(deletedReport);
  return JSONBigInt.parse(serializedReports);
};

module.exports = {
  getReportsRepo,
  getReportByIdRepo,
  createReportRepo,
  updateReportRepo,
  deleteReportRepo,
};
