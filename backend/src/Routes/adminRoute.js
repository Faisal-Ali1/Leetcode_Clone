const express = require('express');
const userValidate = require('../middleware/userValidate');
const adminMiddleware = require('../middleware/adminMiddleware');
const { panel , register , deletee , createProblem , updateProblem , deleteProblem} = require('../Controllers/admin_controllers');
const adminRouter = express.Router();


adminRouter.get('/panel',adminMiddleware, panel);
adminRouter.post('/register', userValidate, adminMiddleware, register);
adminRouter.delete('/delete', adminMiddleware, deletee);

adminRouter.post('/createproblem' ,adminMiddleware, createProblem);
adminRouter.put('/updateproblem/:id' ,adminMiddleware, updateProblem);
adminRouter.delete('/deleteproblem/:id' ,adminMiddleware, deleteProblem);

module.exports = adminRouter;