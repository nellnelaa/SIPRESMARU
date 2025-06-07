/*
  Warnings:

  - You are about to drop the `leaderboards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "leaderboards" DROP CONSTRAINT "leaderboards_student_id_fkey";

-- DropTable
DROP TABLE "leaderboards";
