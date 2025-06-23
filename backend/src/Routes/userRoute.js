const express = require('express');
const user_validate = require('../middleware/userValidate');
const userAuth = require('../Middleware/userAuth');
const { register , login , profile , logout ,deleteUser, getAllProblem, getproblemById , getAllSolvedProblem} = require('../Controllers/user_controllers');
const userRouter = express.Router();
const user_check = require('../middleware/user_check');


userRouter.post('/register' ,user_validate, register);
userRouter.post('/login' ,userAuth, login);
userRouter.get('/profile' ,user_check, profile);
userRouter.post('/logout' ,user_check, logout);
userRouter.delete('/deleteuser' , user_check , deleteUser);
userRouter.get('/check' , user_check , (req , res)=>{
    
    const reply = {
        email: req.result.email,
        firstname: req.result.firstname,
        _id: req.result._id
    }

    res.status(200).json({
        user: reply,
        message:'valid user'
    })
});

userRouter.get('/allproblem' ,user_check, getAllProblem);
userRouter.get('/getproblem/:id' ,user_check, getproblemById);
userRouter.get('/getallsolvedproblem' , user_check , getAllSolvedProblem);



module.exports = userRouter;
