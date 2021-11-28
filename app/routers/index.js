const express = require('express');

const router = express.Router();

const coachController = require('../controllers/coach');

router.route('/coaches')
    // route pour obtenir toutes les annonces enregistrées
    .get(coachController.list)

module.exports = router;