const { createClient} = require('redis');

const client = createClient({
    name:'default',
    password:process.env.REDIS_PASSWORD,
    socket:{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})

module.exports = client;
