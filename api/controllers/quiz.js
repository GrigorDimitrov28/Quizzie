const { quizModel, randomModel } = require('../models');
const fetch = require("node-fetch");

const utils = require('../utils');
const userModel = require('../models/userModel');

function getDetails(req, res, next) {
    const { id } = req.params;

    quizModel.findOne({ _id: id })
        .then(quiz => { res.status(200).json(quiz) })
        .catch(next);
}

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

function getRandom(req,res,next) {
    

    fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple')
        .then(data => data.json()).then(data => {
            const obj = {};
            const randomArr = [];

            for(let item of data.results) {
                let answers = item.incorrect_answers;
                let right = item.correct_answer;
                let index = data.results.indexOf(item);
        
                answers.push(right);
                randomArr.push({[`${index}`]: right});
                obj[item.question] = shuffle(answers);
            }

            randomModel.create({questions: randomArr}).then(a => {
                obj.randomId = a._id;
                res.status(200).send(obj);
            });
            
        })
        .catch(err => console.log(err));
}

async function getCustom(req,res,next){
    const { id } = req.params;
    const response = await quizModel.findById(id);
    let questionsArr = [];

    for(let item of response.qArray){
        questionsArr.push({
            [`${item.qName}`]: shuffle([item.qRAnswer, item.qWAnswer1, item.qWAnswer2, item.qWAnswer3])
        })
    }

    res.status(200).send(questionsArr);
}

async function getAllCustom(req, res, next){
    const quizzes = await quizModel.find();

    res.status(200).send(quizzes);
}

function getFour(req, res, next) {
    quizModel.find()
        .then(quiz => { res.status(200).json(quiz)})
        .catch(next);
}

async function create(req, res, next) {
    const { qNum, difficulty, time, qArray, type, creator, imgUrl } = req.body;
    const quiz = {
        qNum,
        qArray,
        difficulty,
        time,
        type,
        creator,
        imgUrl
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

async function testRandomAnswers(req, res, next) {
    
    const test = req.body;
    let uId = '';
    let qId = '';
    let answers = [];
    let points = 0;

    for(let key in test) {
        if(key == 'uId'){
            uId = test[key];
        }else if(key == 'qId'){
            qId = test[key];
        }else {
            answers.push(test[key]);
        }
    }

    const dbReq = await randomModel.findById({_id: qId});

    console.log(answers);
    
    for(let item of dbReq.questions){
        for(let key in item){
            if(answers.includes(item[key])){
                points++;
                break;
            }
        }
    }
    points = points * 2;

    const uReq = await userModel.findByIdAndUpdate({_id: uId}, {$inc: {
        points: points,
        qPlayed: 1
    }})
    res.status(200).send({p: points});
}

async function testCustomAnswers(req, res, next) {
    const test = req.body;
    let uId = '';
    let qId = '';
    let answers = [];
    let points = 0;

    for(let key in test) {
        if(key == 'uId'){
            uId = test[key];
        }else if(key == 'qId'){
            qId = test[key];
        }else {
            answers.push(test[key]);
        }
    }

    const dbReq = await quizModel.findById({_id: qId});
    
    for(let item of dbReq.qArray){
        for(let key in item){
            if(key == 'qRAnswer' && answers.includes(item[key])){
                points++;
                break;
            }
        }
    }
    points = points * 2;
    console.log(points);
    const uReq = await userModel.findByIdAndUpdate({_id: uId}, {$inc: {
        points: points,
        qPlayed: 1
    }})
    res.status(200).send({p: points});
}

module.exports = {
    getDetails,
    getFour,
    create,
    edit,
    remove,
    getRandom,
    getCustom,
    testRandomAnswers,
    getAllCustom,
    testCustomAnswers
}