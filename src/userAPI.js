const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyAccessToken } = require("./auth");
const { getSuperUser, addItemAtTable, getUser } = require("./userDataBase");

const cors = require('cors');
router.use(cors());
module.exports = router;

router.post("/api/v1/login", async (req, res) => {
    console.log("login");
    res.json({
        message: "Login success"
    });
});

router.post("/api/v1/createSuperuser", async (req, res) => {
    const user = {
        id: uuid.v4(),
        email: req.body.email,
        password: null,
        userType: "0",
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
    
    //   const tmp = await getUser(req.body.email);
    
    //   if (tmp)
    //     return res.status(400).send('Email already exists');
    
      user.password = await bcrypt.hash(req.body.password, 10);
    
      user.accessTokens = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
      const data = addItemAtTable(user, "userTable");
    //   res.cookie('accessTokens', user.accessTokens, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).send(user);
});

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found or bad request"
    });
});
