-- CreateEnum
CREATE TYPE "class_enum" AS ENUM ('grade_10', 'grade_11', 'grade_12');

-- CreateEnum
CREATE TYPE "grade_enum" AS ENUM ('A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "social_media_enum" AS ENUM ('Instagram', 'Twitter', 'Facebook');

-- CreateEnum
CREATE TYPE "admin_role_enum" AS ENUM ('Staff', 'OSIS');

-- CreateEnum
CREATE TYPE "category_enum" AS ENUM ('Academic', 'Non_Academic');

-- CreateTable
CREATE TABLE "students" (
    "id" BIGSERIAL NOT NULL,
    "NIS" VARCHAR(255),
    "full_name" VARCHAR(255),
    "class_name" "class_enum",
    "graduation_year" INTEGER,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" BIGSERIAL NOT NULL,
    "student_id" BIGINT NOT NULL,
    "category_type" "category_enum" NOT NULL,
    "title" VARCHAR(255),
    "organizer_name" VARCHAR(255),
    "image" TEXT,
    "date" TIMESTAMP(6),
    "points" INTEGER,
    "grade" "grade_enum",
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "profile_picture" VARCHAR,
    "role_id" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaderboards" (
    "id" BIGSERIAL NOT NULL,
    "student_id" BIGINT NOT NULL,
    "total_points" INTEGER,
    "rank" INTEGER,

    CONSTRAINT "leaderboards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media_shares" (
    "id" BIGSERIAL NOT NULL,
    "student_id" BIGINT NOT NULL,
    "achievement_id" BIGINT NOT NULL,
    "platform" "social_media_enum",
    "share_link" VARCHAR(255),
    "shared_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "social_media_shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" BIGSERIAL NOT NULL,
    "achievement_id" BIGINT NOT NULL,
    "tag_details_id" BIGINT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_details" (
    "id" BIGSERIAL NOT NULL,
    "tag" VARCHAR(255),

    CONSTRAINT "tag_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_NIS_key" ON "students"("NIS");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "leaderboards" ADD CONSTRAINT "leaderboards_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "social_media_shares" ADD CONSTRAINT "social_media_shares_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "achievements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "social_media_shares" ADD CONSTRAINT "social_media_shares_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "achievements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_tag_details_id_fkey" FOREIGN KEY ("tag_details_id") REFERENCES "tag_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
