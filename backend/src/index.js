const express = require('express');
const app = express();
require('dotenv').config();
const main = require('./config/db')
const userRouter = require('./Routes/userRoute');
const adminRouter = require('./Routes/adminRoute');
const submissionRouter = require('./Routes/userSubmission');
const cookieParser = require('cookie-parser');
const client = require('./config/redis');
const cors = require('cors');


app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
    
}))

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/problem' , submissionRouter);


async function initialConnection() {
    try {

        await Promise.all([main(), client.connect()]);
        console.log('connected to both db');


        app.listen(process.env.PORT, () => {
            console.log(`listen at port no: ${process.env.PORT}`);
        })

    }
    catch (err) {
        console.log(`Error: ${err.message}`);

    }

}



initialConnection();


