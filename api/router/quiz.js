const express = require('express');
const { getCustom } = require('../controllers/quiz');
const router = express.Router();

const quizController = require('../controllers/quiz');


router.post('/create', quizController.create);
router.get('/random', quizController.getRandom);
router.get('/custom/:id', quizController.getCustom);
router.get('/details', quizController.getDetails);


module.exports = router