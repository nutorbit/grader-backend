var mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    difficulty: {
        type: String
    },
    description: {
        type: String
    },
    passedCount: {
        type: Number
    },
    testCase: [
        {
            input: {
                type: String
            },
            output: {
                type: String
            }
        }
    ]

    
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;