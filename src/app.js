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

// const authApiRouter = require('./auth');
// const userApiRouter = require('./userAPI');

const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

require('dotenv').config();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/auth', authApiRouter);
// app.use('/user', userApiRouter);
// app.listen(process.env.PORT, () => console.log('Server app listening on port ' + process.env.PORT));

app.get('/ping', (req, res) => {
    return res.status(200).send('Server is running');
});

app.get('/' , (req, res) => {
  return res.status(200).send('Server is running');
});

module.exports = app;


module.exports.handler = serverless(app);

//DB User Fields
// id = uuid
// email = string
// password = string sha256
// type_user = INT
// ERP = [String]
// created_at = DateTime

// DB ERP Fields
// id = uuid
// ERP_id = uuid -> linked with ERP at USER Table
// created_at = DateTime
// equipment = String
// last_update = DateTime
// type = INT
// status = INT

