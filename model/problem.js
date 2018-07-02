var mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    difficulty: {
        type: String
    },
    description: {
        type: String
    },
    reqInput: {
        type: String
    },
    reqOutput: {
        type: String
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
})

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;