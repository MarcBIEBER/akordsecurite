require('dotenv').config();
const jwt = require('jsonwebtoken');

// verify user token:
function verifyAccessToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    // console.log(authHeader)
    // const token = authHeader && authHeader.split(' ')[1];
    // if (token == null) return res.sendStatus(401);
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user_decrypted = user;
        next();
    });
};

module.exports = {
    verifyAccessToken
};