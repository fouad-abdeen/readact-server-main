require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;

const generateAccessToken = (payload) =>
  jwt.sign(payload, secret, {
    expiresIn: 7200,
  });

module.exports = generateAccessToken;
