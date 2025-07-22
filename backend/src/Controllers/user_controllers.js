const user = require('../Modals/userSchema');
const jwt = require('jsonwebtoken');
const client = require('../config/redis')
const problem = require("../Modals/problemSchema");
const submission = require('../Modals/submissionSchema');




const register = async (req, res) => {
    try {

        req.body.role = 'user';

       const personData = await user.insertOne(req.body);
       
        
       const token = jwt.sign({_id:personData._id, email: req.body.email, role: personData.role }, process.env.JWT_PRIVATE_KEY, { expiresIn: "10h" })

    
       
       res.cookie('token' , token , { maxAge: 36000000});

        const reply = {
            _id:personData._id,
            firstname: personData.firstname,
            email: personData.email,
            role: personData.role
        }

        // console.log('reply: ' , reply);
        

        res.status(201).json({
            user: reply,
            message:'user registered successfully'
        })

    }
    catch (err) {
        res.status(401).send('Error: ' + err.message)
    }
}

const login = (req, res) => {
    try {

        const token = jwt.sign({_id:req.userData._id, email: req.body.email, role: req.userData.role }, process.env.JWT_PRIVATE_KEY, { expiresIn: "10h" })

        const reply = {
            _id: req.userData._id,
            email: req.userData.email,
            firstname: req.userData.firstname,
            role:req.userData.role
            
        }

        // console.log(reply);
        

        res.cookie('token', token, { maxAge: 36000000  });
        
        res.status(200).json({
            user : reply,
            message : "Login successfully"
        });


    }
    catch (err) {
        res.status(401).send(err.message)
    }
}

const profile = async (req, res) => {
    try {
       

        res.status(200).send(req.result);

    }
    catch (err) {
        res.status(400).send('Error: ' + err.message)
    }
}

const logout = (req, res) => {
    try {


        const { token } = req.cookies;
        const payload = jwt.decode(token);

        client.set(`token:${token}`, 'expired');
        client.expireAt(`token:${token}`, payload.exp);

        res.cookie('token', null, { expires: new Date(Date.now()) });
        res.send('logout successfully');
    }
    catch (err) {
        res.status(400).send('Error: ' + err.message)
    }
}

const deleteUser = async(req , res)=>{
    try{
        const userId = req.result._id;

        if(req.result.email === 'faisal@gmail.com')
            return res.status(400).send('admin cant be deleted');

        await user.findByIdAndDelete(userId);

        await submission.deleteMany({userId });

        res.status(200).send('user data has been deleted');


    }
    catch(err){
        res.status(500).send('Error: '+err.message);
    }
}

const getAllProblem = async (req, res) => {

    const AllProblem = await problem.find({}).select('title _id difficultyLevel tag');
    res.status(200).send(AllProblem)
}

const getproblemById = async( req , res) => {
    try{
        const {id} = req.params;

       const prob = await problem.findOne({_id:id}).select(' -problemCreator -problemUpdater -__v -hiddenTestCases')
    //    .skip(req.page-1).limit(10);

       if(!prob)
        throw new Error("Problem not found")

       res.status(200).send(prob);
    }
    catch(err){
        res.status(404).send('Error: '+ err.message);
    }
}

const getAllSolvedProblem = async(req , res)=>{
    try{

        const userId = req.result._id;

        const person = await user.findById(userId).populate({
            path:"problemSolved",
            select:"_id title difficultyLevel"
        });

        if(!person)
            return res.status(404).send('user not found');

        // if(person.problemSolved.length === 0)
        //     return res.status(200).send('you have not solved any problem yet');

        res.status(200).send(person.problemSolved);


    }
    catch(err){
        res.status(400).send('Error: ' + err.message);
    }
}



module.exports = { register, login, profile, logout, deleteUser, getAllProblem, getproblemById , getAllSolvedProblem};



