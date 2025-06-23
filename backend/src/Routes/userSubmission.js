const express = require('express');
const user_check = require('../middleware/user_check');
const waitTime = require('../middleware/waitTime');
const {submitCode , runCode , getAllSubmission} = require('../Controllers/user_Submission');

const submissionRouter = express.Router();

submissionRouter.post('/submit/:id' ,user_check,waitTime, submitCode);
submissionRouter.post('/run/:id' , user_check , runCode);
submissionRouter.get('/getallsubmission/:pid' , user_check , getAllSubmission);

module.exports = submissionRouter;

