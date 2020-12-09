const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const quizSchema = new mongoose.Schema({
    time: {
        type: Number,
        required: true
    },
    questions:{
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
    likes: {
        type: Number,
        default: 0
    }
    
}, { timestamps: { createdAt: 'created_at' } });


module.exports = mongoose.model('Quiz', quizSchema);
