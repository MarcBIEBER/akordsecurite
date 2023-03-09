require('dotenv').config();
const jwt = require('jsonwebtoken');

// verify user token:
function verifyAccessToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user_decrypted = user;
        next();
    });
};

const UserType = Object.freeze({ 
    SUPER_ADMIN: "0", 
    ADMIN: "1", 
    USER: "2"
  });

module.exports = {
    verifyAccessToken,
    UserType
};