-- Verify coachfinder:initialisation on pg

BEGIN;

SELECT "id" FROM "coach_has_skill" WHERE false;
SELECT "id" FROM "answer" WHERE false;
SELECT "id" FROM "coach" WHERE false;
SELECT "id" FROM "student" WHERE false;
SELECT "id" FROM "request" WHERE false;
SELECT "id" FROM "skill" WHERE false;

ROLLBACK;
