const validator = require('validator');
const bcrypt = require('bcrypt');
const user = require('../Modals/userSchema');


const user_validation = async( req , res , next ) =>{
    try{

        if(!req.body){
            if(req.path === '/register'){
                throw new Error('enter user/admin data')
            }
                throw new Error('Enter your data')
        }
            

        const importantField = [ 'firstname' , 'email' , 'password'];

        const isAvail = importantField.every((item)=> Object.keys(req.body).includes(item));

        if(!isAvail)
            throw new Error('field missing')

        const { firstname ,  email , password } = req.body;

        if(!(firstname.length > 4 && firstname.length < 30))
            throw new Error('firstname must have char between 5-30')

        if(!password.length > 5)
            throw new Error('password is too short')

        if(!validator.isEmail(email))
            throw new Error('invilid Email_id')

        if(!validator.isStrongPassword(password))
            throw new Error('weak Password')

        req.body.password = await bcrypt.hash(req.body.password, 10);

        const personAvail = await user.findOne({email:email});

        if(personAvail)
            return res.status(400).send('email already registered');

        

        next();


    }
    catch(err){
        res.status(400).send('Error: '+ err.message)
    }
}

module.exports = user_validation;