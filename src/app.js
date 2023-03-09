const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const v4 = require('uuid').v4;
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
const bcrypt = require('bcryptjs');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userApiRouter = require('./userAPI');

app.use('/user', userApiRouter);

app.get('/ping', (req, res) => {
  return res.status(200).send('Server is running');
});

app.get('/' , (req, res) => {
  return res.status(200).send('Server is running');
});

module.exports = app;


app.listen(process.env.PORT, () => console.log('Server app listening on port ' + process.env.PORT));
module.exports.handler = serverless(app);

