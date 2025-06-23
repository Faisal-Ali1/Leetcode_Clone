const client = require('../config/redis');
const jwt = require('jsonwebtoken');

const waitTime = async(req , res , next)=>{
    try{
        const userId = req.result._id;

        if(!userId)
            res.status(400).send('userId missing');

        const redisKey = `cooldown${userId}`;

        const exist = await client.exists(redisKey);

        if(exist)
            return res.status(429).json({
                error: 'please wait for 10 second before next submission'
            });

       await client.set(redisKey , 'cooldown_active' , {
        EX: 10, //expire after 10 second
        NX : true //only set if not exist
       });

       next();
    }
    catch(err){
        res.status(500).send('Rate limiter Error(cooldown time): '+ err.message);
    }
}


module.exports = waitTime;