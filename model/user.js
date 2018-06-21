var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    permission: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    problemSolved: [
        {
            id: {
                type: Number
            },
            solved: {
                type: Boolean
            },
            solveCount: {
                type: Number
            }
        }
    ]

        
    
});

const User = mongoose.model('User', UserSchema);
module.exports = User;