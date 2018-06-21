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