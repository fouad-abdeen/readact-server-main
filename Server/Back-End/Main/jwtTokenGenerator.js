"use strict";

require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.TOKEN_SECRET;

const generateAccessToken = (user_data) =>
  jwt.sign(user_data, SECRET, {
    expiresIn: 7200,
  });

module.exports = generateAccessToken;
