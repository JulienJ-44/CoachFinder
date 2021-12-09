const express = require('express');

const router = express.Router();

const coachController = require('../controllers/coach');
const skillController = require('../controllers/skill');
const requestController = require('../controllers/request');
const studentController = require('../controllers/student');
const answerController = require('../controllers/answer');
const checkAuth = require('../middlewares/check-auth')


router.route('/coaches')
    .get(coachController.list)
    .post(coachController.add)

router.route('/coaches/:id(\\d+)')
    .patch(coachController.update)

router.route('/coaches/:coach_id(\\d+)/skills')
    .post(skillController.add)

router.route('/students/:id(\\d+)')
    .patch(studentController.update)

router.route('/students')
    .post(studentController.add)

router.route('/coaches/signin')
    .post(coachController.signin)

router.route('/students/signin')
    .post(studentController.signin)

router.route('/skills')
    .get(skillController.list)

router.route('/coaches/:id(\\d+)/requests')
    .get(requestController.listByCoach)

router.route('/requests/:id(\\d+)/answers')
    .get(answerController.listByRequest)
    .post(answerController.add)

router.route('/students/:student_id(\\d+)/coaches/:coach_id(\\d+)/requests')
    .post(checkAuth, requestController.add)

module.exports = router;