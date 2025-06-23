const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30
    },
    lastname: {
        type: String,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        immutable: true
    },
    password:{
        type:String,
        minLength: 5,
        required: true,
    },
    age: {
        type: Number,
        min: 5,
        max: 80
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    problemSolved: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'problem',
        }
        
        
    ]
}, { timestamps: true })

// userSchema.post( 'findByIdAndDelete' , async function(userInfo){
//     if(userInfo){
//         mongoose.model('submission').deleteMany(userInfo._id);
//     }
// })


const user = mongoose.model('user', userSchema);

module.exports = user;