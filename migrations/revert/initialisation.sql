-- Revert coachfinder:initialisation from pg

BEGIN;

DROP TABLE IF EXISTS "coach_has_skill", "answer", "coach", "student", "request", "skill";

COMMIT;
