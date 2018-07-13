var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
 
var connection = mongoose.createConnection("mongodb://localhost/db");
autoIncrement.initialize(connection);

const problemSchema = new mongoose.Schema({
    problemId: {
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
});

problemSchema.plugin(autoIncrement.plugin, { 
    model: 'Problem',
    field: 'problemId',
});
const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;