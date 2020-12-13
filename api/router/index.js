const router = require('express').Router();
const users = require('./users');
const quiz = require('./quiz');
const forum = require('./forum');

router.use('/users', users);
router.use('/quiz', quiz);
router.use('/forum', forum);

module.exports = router;
