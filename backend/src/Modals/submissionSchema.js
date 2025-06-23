const mongoose = require('mongoose');
const {Schema} = mongoose;


const submission_schema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required: true

    },
    problemId:{
        type:Schema.Types.ObjectId,
        ref:'problem',
        required: true
    },
    language:{
        type: String,
        required: true,
        enum: ['java' , 'javascript', 'c++']

    },
    code:{
        type: String,
        required: true

    },
    status:{
        type: String,
        enum: ['pending' , 'accepted', 'wrong' , 'error'],
        default: 'pending'
    },
    memory:{
        type: Number,
        default: 0,
        
    },
    runtime:{
         type: Number,  // milliseconds
         default: 0,
        
    },
    errorMessage:{
        type: String,
        default:'',

    },
    totalTestCases:{
        type:Number,
        default:0,
    
    },
    testCasesPassed:{
        type:Number,
        default:0
    }
} , { timestamps: true});

// its for indexing userId and problemId in accending order (1 for accending) (-1 for decending)
submission_schema.index({ userId: 1 , problemId: 1});

const submission = mongoose.model('submission' , submission_schema);

module.exports = submission;