const { quizModel } = require('../models');
const fetch = require("node-fetch");

const utils = require('../utils');
const userModel = require('../models/userModel');

function getDetails(req, res, next) {
    const { id } = req.body;

    quizModel.findOne({ _id: id })
        .then(quiz => { res.status(200).json(quiz) })
        .catch(next);
}

function getRandom(req,res,next) {
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple')
        .then(data => data.json()).then(data => {
            const obj = {};

            for(let item of data.results) {
                let answers = item.incorrect_answers;
                let right = item.correct_answer;

                answers.push(right);

                obj[item.question] = shuffle(answers);
            }
            
            res.status(200).send(obj)
        })
        .catch(err => console.log(err));
}

async function getCustom(req,res,next){
    const { id } = req.params;
    const response = await quizModel.findById(id)
    console.log(response);
}

function getFour(req, res, next) {
    quizModel.find()
        .then(quiz => { res.status(200).json(quiz)})
        .catch(next);
}

async function create(req, res, next) {
    const { qNum, difficulty, time, qArray, type, creator } = req.body;
    const quiz = {
        qNum,
        qArray,
        difficulty,
        time,
        type,
        creator
    }

    console.log(quiz);

    const usUpdate = await userModel.findByIdAndUpdate({_id: quiz.creator}, {$inc: {qCreated: 1}});
    console.log(usUpdate)
    return quizModel.create(quiz)
    .then((createdQuiz) => {
        res.status(200).send(createdQuiz);
    })
    .catch(err => {
        res.status(400).send(err);
        return;
    });
}

function edit(req, res, next) {
    const { questions, difficulty, time, quizId } = req.body

    return 'gosho'
}

function remove(req, res, next) {
    const { id } = req.body;

    return 'pesho'
}

module.exports = {
    getDetails,
    getFour,
    create,
    edit,
    remove,
    getRandom,
    getCustom
}