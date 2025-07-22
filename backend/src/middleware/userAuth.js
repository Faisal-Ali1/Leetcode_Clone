const user = require('../Modals/userSchema');
const bcrypt = require('bcrypt');

const userAuth = async (req, res, next) => {
    try {
        if (!req.body)
            throw new Error('enter your email_id and Password')

        if (!req.body.email)
            throw new Error('email is missing')

        if (!req.body.password)
            throw new Error('password is missing')


        const userData = await user.findOne({ email: req.body.email })

        if (!userData)
            return res.status(400).send('invilid credintial');

        const isTrue = await bcrypt.compare(req.body.password, userData.password);

        if (!isTrue)
            return res.status(400).send('invilid credintial');

        //    req.role = userData.role; 
        req.userData = userData;


        next();
    }
    catch (err) {
        res.status(403).send('Error: ' + err.message)
    }
}


module.exports = userAuth;