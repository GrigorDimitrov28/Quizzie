const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const randomSchema = new mongoose.Schema({
    questions: {
        type: Array,
        default: [],
        required: true
    }
    
}, { timestamps: { createdAt: 'created_at' } });


module.exports = mongoose.model('Random', randomSchema);