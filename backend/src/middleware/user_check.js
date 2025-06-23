const client = require('../config/redis')
const jwt = require('jsonwebtoken')
const user = require('../Modals/userSchema');

const user_check = async(req , res , next)=>{
    try{
        const { token } = req.cookies;
       
        if (!token)
            throw new Error('token is missing')

        const isExist = await client.exists(`token:${token}`);

        if(isExist)
            throw new Error('invilid token');

        const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        // console.log(payload);
        
        const {_id} = payload;
        // console.log(_id);
        
        const result = await user.findById(_id);
        // console.log(result);
        
        if(!result)
            throw new Error('invilid user');

        req.result = result;

        next();
    }
    catch(err){
        res.status(401).send('Error: '+ err.message)
    }
}

module.exports = user_check;