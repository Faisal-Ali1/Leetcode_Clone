const mongoose = require('mongoose');


const problem_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: String,
        requied: true,
        enum: ['easy', 'medium', 'hard']
    },
    tag:{
        type:String,
        enum:[ 'array' , 'linked list' , 'graph' , 'dp'],
        required:true
    },
    discription: {
        type: String,
        required: true
    },
    visibleTestCases: [
        {
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            },
            explanation: {
                type: String,
                required: true
            }
        }
    ],
    hiddenTestCases: [
        {
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            }
        }
    ],
    starterCode: [
        {
            language: {
                type: String,
                required: true
            },
            initialCode: {
                type: String,
                required: true
            },
        }
    ],
    refrenceSolution: [
        {
            language: {
                type: String,
                required: true
            },
            completeCode: {
                type: String,
                required: true
            },
        }
    ],
    problemCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true

    },
    problemUpdater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})


const problem = mongoose.model('problem', problem_schema);

module.exports = problem;

