-- 1️⃣ Buat ENUM lebih dulu
CREATE TYPE class_enum AS ENUM ('10', '11', '12');
CREATE TYPE admin_role_enum AS ENUM ('Staff', 'OSIS Representative');
CREATE TYPE social_media_enum AS ENUM ('Instagram', 'Twitter', 'Facebook');
CREATE TYPE organizer_enum AS ENUM ('Official', 'Non-Official');
CREATE TYPE level_enum AS ENUM ('Internasional', 'Nasional', 'Regional');
CREATE TYPE rank_enum AS ENUM ('1', '2', '3', 'Lainnya');
CREATE TYPE category_enum AS ENUM ('Academic', 'Non-Academic');

-- 2️⃣ Buat tabel
CREATE TABLE "students" (
  "id" bigserial PRIMARY KEY,
  "NIS" varchar(255) UNIQUE,
  "full_name" varchar(255),
  "class_name" class_enum,  
  "graduation_year" int
);

CREATE TABLE "achievements" (
  "id" bigserial PRIMARY KEY,
  "student_id" bigint NOT NULL,
  "category_id" bigint NOT NULL,
  "title" varchar(255),
  "organizer_name" varchar(255),
  "mentor" varchar(255),
  "documentation" text,
  "date" timestamp,
  "points" int,
  "created_at" timestamp DEFAULT NOW(),
  "updated_at" timestamp DEFAULT NOW()
);

CREATE TABLE "admins" (
  "id" bigserial PRIMARY KEY,
  "username" varchar(255) UNIQUE,
  "password" varchar(255),
  "role" admin_role_enum  
);

CREATE TABLE "leaderboards" (
  "id" bigserial PRIMARY KEY,
  "student_id" bigint NOT NULL,
  "total_points" int,
  "rank" int
);

CREATE TABLE "social_media_shares" (
  "id" bigserial PRIMARY KEY,
  "student_id" bigint NOT NULL,
  "achievement_id" bigint NOT NULL,
  "platform" social_media_enum,  
  "share_link" varchar(255),
  "shared_at" timestamp DEFAULT NOW()
);

CREATE TABLE "categories" (
  "id" bigserial PRIMARY KEY,
  "organizer_type" organizer_enum,  
  "tingkatan" level_enum,  
  "rank" rank_enum,  
  "category_type" category_enum  
);

CREATE UNIQUE INDEX ON "categories" ("tingkatan", "rank", "category_type");

-- 3️⃣ Tambahkan Foreign Key
ALTER TABLE "achievements" ADD FOREIGN KEY ("student_id") REFERENCES "students" ("id");

ALTER TABLE "achievements" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "leaderboards" ADD FOREIGN KEY ("student_id") REFERENCES "students" ("id");

ALTER TABLE "social_media_shares" ADD FOREIGN KEY ("student_id") REFERENCES "students" ("id");

ALTER TABLE "social_media_shares" ADD FOREIGN KEY ("achievement_id") REFERENCES "achievements" ("id");
