-- On demarre une transaction afin de s'assurer de la cohérence globale de la BDD
BEGIN;

-- D'abord on supprime les tables si elles existent
DROP TABLE IF EXISTS "coach_has_skill", "coach", "student", "request", "skill";

-- 1ère table
CREATE TABLE "coach" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "description" TEXT,
  "zip_code" TEXT NOT NULL,
  "rate" FLOAT NOT NULL,
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
    "updated_at" TIMESTAMPTZ
);


INSERT INTO "coach" ("first_name", "last_name", "description", "rate", "zip_code", "password") VALUES
('John', 'Doe', 'Super coach', 8.5, '05', 'monMdP'),
('Jane', 'Doe', 'Coach au top', 9.5, '44', 'myPW'),
('Bill', 'Gate', 'Je peux vous expliquer 2 ou 3 choses', 10, '09', 'superPW');

INSERT INTO "student" ("first_name", "last_name", "zip_code", "password") VALUES
('Riri', 'Ducktale',  '05', 'monMdP'),
('Fifi', 'Ducktale',   '44', 'myPW'),
('Loulou', 'Ducktale',  '09', 'superPW');

INSERT INTO "skill" ("designation") VALUES
('Front End'),
('Back End'),
('Business');

INSERT INTO "coach_has_skill" ("coach_id", "skill_id") VALUES
(1,2),
(2,1),
(2,2),
(3,1),
(3,2),
(3,3);

INSERT INTO "request" ("student_id", "coach_id", "message") VALUES
(1,2,'Avez-vous de la disponibilité la semaine prochaine?'),
(2,3,'Quels framework maitrisez vous?'),
(3,1,'Je souhaite apprendre React.'),
(1,3,'Pouvez-vous m''apprendre comment créer une entreprise?');

-- Ensuite on créer nos tables
COMMIT;
