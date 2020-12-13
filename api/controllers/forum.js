const { quizModel, randomModel, forumModel, userModel } = require('../models');
const fetch = require("node-fetch");

async function create(req, res, next) {
    console.log(req.body);
    const forum = await forumModel.create(req.body);
    const user = await userModel.findByIdAndUpdate({_id: req.body.author}, {$inc: {pCreated: 1}})
    res.status(200).send(forum);
}

async function getAll(req, res, next) {
    const posts = await forumModel.find().populate('author');
    res.status(200).send(posts);
}

async function getOne(req, res, next) {
    const post = await forumModel.findById({_id: req.params.id}).populate('author');
    res.status(200).send(post);
}

async function deleteOne(req, res, next) {
    const { id }= req.params;
    const data = req.body;
    const delPost = await forumModel.findByIdAndDelete({_id: id})

    console.log(data);
    res.status(200).send(delPost);
}

async function editOne(req, res, next) {
    const { id } = req.params;
    const data = req.body;
    const editPost = await forumModel.findByIdAndUpdate({_id: id}, data);

    res.status(200).send(editPost);
}

async function comment(req, res, next) {
    const { id } = req.params;
    const data = req.body;
    const postComment = await forumModel.findByIdAndUpdate({_id: id}, {$addToSet: {
        comments: {
            creator: data.creator,
            content: data.content
        }
    }})

    res.status(200).send(postComment);
}

module.exports = {
    create,
    getAll,
    getOne,
    deleteOne,
    editOne,
    comment
}