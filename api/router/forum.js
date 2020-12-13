const express = require('express');
const router = express.Router();

const forumController = require('../controllers/forum');

router.get('/getAll', forumController.getAll);
router.get('/details/:id', forumController.getOne);

router.post('/create', forumController.create);
router.post('/delete/:id', forumController.deleteOne);
router.post('/comment/:id', forumController.comment);

router.put('/edit/:id', forumController.editOne);


module.exports = router