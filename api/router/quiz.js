const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quiz');


router.post('/create', quizController.create);
router.post('/testRandom', quizController.testRandomAnswers);
router.post('/testCustom', quizController.testCustomAnswers);

router.get('/getAll', quizController.getAllCustom);
router.get('/random', quizController.getRandom);
router.get('/custom/:id', quizController.getCustom);
router.get('/details/:id', quizController.getDetails);


module.exports = router