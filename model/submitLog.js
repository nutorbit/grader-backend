var mongoose = require("mongoose");

var autoIncrement = require('mongoose-auto-increment');
 
var connection = mongoose.createConnection("mongodb://localhost/db");
autoIncrement.initialize(connection);

const submitSchema = new mongoose.Schema({
    submitId: {
        type: Number
    },
    submitTime: {
        type: String,
        default: (new Date()).toLocaleString()
    },
    sender: {
        type: String
    },
    submitProblem: {
        type: Number
    },
    result: {
        type: String
    },
    processTime: {
        type: Number
    },
    processMemory: {
        type: Number
    }
});

submitSchema.plugin(autoIncrement.plugin, {
    model: 'Submit',
    field: 'submitId'
});
const SubmitLog = mongoose.model('Submit', submitSchema);
module.exports = SubmitLog;