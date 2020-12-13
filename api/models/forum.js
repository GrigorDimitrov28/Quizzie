const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const forumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: ''
    },

    content: {
        type: String,
        required: true,
        default: ''
    },

    author: {
        type: ObjectId,
        ref: 'User'
    },
    
    comments: [{
        creator: {
            type: ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
            default: ''
        }
    }]
    
}, { timestamps: { createdAt: 'created_at' } });


module.exports = mongoose.model('Forum', forumSchema);
