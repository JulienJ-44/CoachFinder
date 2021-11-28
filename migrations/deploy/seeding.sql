-- Deploy coachfinder:seeding to pg

BEGIN;

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
(3,1,'Je souhaite apprendre Synfony.'),
(1,3,'Pouvez-vous m''apprendre comment créer une entreprise?');

INSERT INTO "answer" ("request_id",  "sender", "message") VALUES
(1, 'Jane', 'Oui tout à fait. Est-ce que mercredi vous irait?'),
(2, 'Bill', 'Je maitrise REACT, VUE, ANGULAR'),
(2, 'Fifi', 'OK super, peut-on planifier des cours tous les lundi à 18h?'),
(2, 'Bill', 'Oui pas de pb'),
(3, 'John','Désolé je ne maitrise pas ce framework'),
(4, 'Bill','Oui avec plaisir.');

COMMIT;
