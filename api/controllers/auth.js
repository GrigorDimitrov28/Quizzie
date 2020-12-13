const {
    userModel,
    quizModel,
    forumModel,
    tokenBlacklistModel
} = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');

const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData
}

function register(req, res, next) {
    const { username, password, rePassword } = req.body;

    return userModel.create({ username, password })
        .then((createdUser) => {
            createdUser = bsonToJson(createdUser);
            createdUser = removePassword(createdUser);

            const token = utils.jwt.createToken({ id: createdUser._id });
            if (process.env.NODE_ENV === 'production') {
                res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
            } else {
                res.cookie(authCookieName, token, { httpOnly: true })
            }
            res.status(200)
                .send(createdUser);
        })
        .catch(err => {
            console.log(err);
            if (err.name === 'MongoError' && err.code === 11000) {
                let field = err.message.split("index: ")[1];
                field = field.split(" dup key")[0];
                field = field.substring(0, field.lastIndexOf("_"));

                res.status(409)
                    .send({ message: `This ${field} is already registered!` });
                return;
            }
            next(err);
        });
}

function login(req, res, next) {
    const { username, password } = req.body;

    userModel.findOne({ username })
        .then(user => {
            return Promise.all([user, user ? user.matchPassword(password) : false]);
        })
        .then(([user, match]) => {
            if (!match) {
                res.status(401)
                    .send({ message: 'Wrong username or password' });
                return
            }
            user = bsonToJson(user);
            user = removePassword(user);

            const token = utils.jwt.createToken({ id: user._id });

            if (process.env.NODE_ENV === 'production') {
                res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
            } else {
                res.cookie(authCookieName, token, { httpOnly: true })
            }
            res.status(200)
                .send(user);
        })
        .catch(next);
}

function logout(req, res) {
    const token = req.cookies[authCookieName];

    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(authCookieName)
                .status(200)
                .send({ message: 'Logged out!' });
        })
        .catch(err => res.send(err));
}

function getProfileInfo(req, res, next) {
    const { _id: userId } = req.user;

    userModel.findOne({ _id: userId }, { password: 0, __v: 0 }) //finding by Id and returning without password and __v
        .then(user => { res.status(200).json(user) })
        .catch(next);
}

function editProfileInfo(req, res, next) {
    const { _id: userId } = req.user;
    const { username } = req.body;

    userModel.findOneAndUpdate({ _id: userId }, { username }, { runValidators: true, new: true })
        .then(x => { res.status(200).json(x) })
        .catch(next);
}

function getInfo(req, res, next) {
    const { id } = req.params;
    userModel.findOne({_id: id}).then(d => res.status(200).send(d)).catch(err => res.status(400).send(err));

}

async function getHomeInfo(req, res, next) {
    let quizzes = await quizModel.find()
    const quizCount = quizzes.length;

    quizzes = quizzes.splice(0, 4);

    let leaderboard = await userModel.find()
    const userCount = leaderboard.length;
    leaderboard = leaderboard.sort((a, b) => b.points - a.points).splice(0, 5);

    let forum = await forumModel.find()
    const forumCount = forum.length;

    forum = forum.splice(0, 2);

    const obj = {
        qCount: quizCount,
        uCount: userCount,
        fCount: forumCount,
        featuredQuizzes: quizzes,
        leaderboard: leaderboard,
        featuredForum: forum
    }

    res.status(200).send(obj);
}

module.exports = {
    login,
    register,
    logout,
    getProfileInfo,
    editProfileInfo,
    getInfo,
    getHomeInfo
}
