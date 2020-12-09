const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quiz');


router.post('/create', quizController.create);
router.get('/details', quizController.getDetails);


module.exports = router