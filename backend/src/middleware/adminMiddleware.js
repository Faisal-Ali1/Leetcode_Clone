const jwt = require('jsonwebtoken')
const user = require('../Modals/userSchema')

const adminMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token)
            throw new Error('token is missing')

        const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        if (!(payload.role === 'admin'))
            throw new Error('invalid admin')

        const adminData = await user.findOne({ email: payload.email });

        if (!adminData)
            throw new Error('invilid admin');

        req.adminData = adminData;

        next();

    }
    catch (err) {
        res.status(400).send('Error: ' + err.message)
    }

}

module.exports = adminMiddleware;