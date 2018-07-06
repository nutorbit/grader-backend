var mongoose = require("mongoose");

const submitSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    submitTime: {
        type: Date,
        default: Date.now
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

const SubmitLog = mongoose.model('Submit', submitSchema);
module.exports = SubmitLog;