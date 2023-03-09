const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyAccessToken, UserType } = require("./auth");
const { getSuperUser, addItemAtTable, getUser, getIsAdmin, updateUser } = require("./userDataBase");

const cors = require('cors');
router.use(cors());
module.exports = router;

router.post("/api/v1/login", async (req, res) => {
    const user = await getUser(req.body.email);
    if (!user)
        return res.status(400).send('Email or password is wrong');
    await bcrypt.compare(req.body.password, user.password, async function (err, result) {
        if (result === true) {
            user.accessTokens
            user.accessTokens = null;
            user.accessTokens = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
            const updateExpression = "SET accessTokens = :accessTokens";
            const expressionAttributeValues = {
                ":accessTokens": user.accessTokens,
            };
            await updateUser(req.body.email, updateExpression, expressionAttributeValues);

            res.cookie('accessTokens', user.accessTokens, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
            return res.status(200).send(user);
        } else {
            return res.status(400).send('Email or password is wrong');
        }
    });
});

router.post("/api/v1/createSuperuser", async (req, res) => {
    if (req.body.secretKey !== process.env.SECRET_KEY) {
        return res.status(403).send("Forbidden");
    }
    const user = {
        id: uuid.v4(),
        email: req.body.email,
        password: null,
        userType: UserType.SUPER_ADMIN,
        ERP: uuid.v4(),
        creationDate: new Date().toISOString(),
        accessTokens: null,
    }

    user.password = await bcrypt.hash(req.body.password, 10);

    user.accessTokens = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    const data = addItemAtTable(user, "userTable");
    // res.cookie('accessTokens', user.accessTokens, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).send(user);
});

router.post("/api/v1/register", verifyAccessToken, getSuperUser, async (req, res) => {

    const user = {
        id: uuid.v4(),
        email: req.body.email,
        password: null,
        userType: req.body.userType,
        ERP: uuid.v4(),
        creationDate: new Date().toISOString(),
        accessTokens: null,
      }
    
      user.password = await bcrypt.hash(req.body.password, 10);
    
      user.accessTokens = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
      const data = addItemAtTable(user, "userTable");
    //   res.cookie('accessTokens', user.accessTokens, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).send(user);
});

router.post("/api/v1/registerUser", verifyAccessToken, getIsAdmin, async (req, res) => {

    const user = {
        id: uuid.v4(),
        email: req.body.email,
        password: null,
        userType: req.body.userType,
        ERP: req.user_decrypted.ERP,
        creationDate: new Date().toISOString(),
        accessTokens: null,
      }
    
      user.password = await bcrypt.hash(req.body.password, 10);
    
      user.accessTokens = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
      const data = addItemAtTable(user, "userTable");
    //   res.cookie('accessTokens', user.accessTokens, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).send(user);
});

router.post('/api/v1/isLogedIn', verifyAccessToken, async (req, res) => {
    return res.status(200)
});

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found or bad request"
    });
});
