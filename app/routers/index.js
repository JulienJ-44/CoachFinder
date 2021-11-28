const express = require('express');

const router = express.Router();

const coachController = require('../controllers/coach');
const skillController = require('../controllers/skill');
const requestController = require('../controllers/request');
const studentController = require('../controllers/student');
const answerController = require('../controllers/answer');



router.route('/coaches')
    // route pour obtenir toutes les annonces enregistrées
    .get(coachController.list)

router.route('/coaches/signin')
    .post(coachController.signin)

router.route('/students/signin')
    .post(studentController.signin)

router.route('/skills')
    // route pour obtenir toutes les annonces enregistrées
    .get(skillController.list)

router.route('/coaches/:id(\\d+)/requests')
    // route pour obtenir toutes les annonces enregistrées
    .get(requestController.listByCoach)

router.route('/requests/:id(\\d+)/answers')
    // route pour obtenir toutes les annonces enregistrées
    .get(answerController.listByCoach)

    

module.exports = router;