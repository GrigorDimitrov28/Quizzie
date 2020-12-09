const router = require('express').Router();
const users = require('./users');
const quiz = require('./quiz');


router.use('/users', users);
router.use('/quiz', quiz);

module.exports = router;
