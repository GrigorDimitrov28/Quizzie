const { quizModel } = require('../models');

const utils = require('../utils');

function getDetails(req, res, next) {
    const { id } = req.body;

    quizModel.findOne({ _id: id })
        .then(quiz => { res.status(200).json(quiz) })
        .catch(next);
}

function getFour(req, res, next) {
    quizModel.find()
        .then(quiz => { res.status(200).json(quiz)})
        .catch(next);
}

function create(req, res, next) {
    const { questions, difficulty, time, creator } = req.body;
    const quiz = {
        questions,
        difficulty,
        time,
        creator
    } 

    return quizModel.create(quiz);
}

function edit(req, res, next) {
    const { questions, difficulty, time, quizId } = req.body

    return 'gosho'
}

function remove(req, res, next) {
    const { id } 

    return 'pesho'
}

module.exports = {
    getDetails,
    getFour,
    create,
    edit,
    remove
}