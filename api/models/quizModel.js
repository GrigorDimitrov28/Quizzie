const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const quizSchema = new mongoose.Schema({
    time: {
        type: Number,
        required: true
    },
    qArray:{
        type: Array,
        required: true,
        minLength: 5,
        maxLength: 15
    },
    difficulty: {
        type: Number,
        min: 1,
        max: 3,
        required: true
    },
    creator: {
        type: ObjectId,
        ref: "User"
    },
    qNum: {
        type: Number,
        min: 0,
        max: 15,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        required: true
    }
    
}, { timestamps: { createdAt: 'created_at' } });


module.exports = mongoose.model('Quiz', quizSchema);
