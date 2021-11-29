-- Deploy coachfinder:initialisation to pg

BEGIN;

-- 1ère table
CREATE TABLE "coach" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "description" TEXT,
  "zip_code" TEXT NOT NULL,
  "rate" FLOAT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ 
);

--2ème table
CREATE TABLE "student" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "zip_code" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ 
);

--3ème tables
CREATE TABLE "request" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    "coach_id" INTEGER NOT NULL REFERENCES "coach"("id") ON DELETE CASCADE,
    "student_id" INTEGER NOT NULL REFERENCES "student"("id") ON DELETE CASCADE
);

--4ème table
CREATE TABLE "skill" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "designation" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ 
);

--5ème table
CREATE TABLE "coach_has_skill" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "coach_id" INTEGER NOT NULL REFERENCES "coach"("id") ON DELETE CASCADE,
    "skill_id" INTEGER NOT NULL REFERENCES "skill"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    UNIQUE("coach_id", "skill_id")
);

--6ème table
CREATE TABLE "answer" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "message" TEXT NOT NULL,
    "sender" TEXT NOT NULL,   
    "request_id" INTEGER NOT NULL REFERENCES "request"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;
