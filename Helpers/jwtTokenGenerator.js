require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;

const generateAccessToken = (payload, expirartionPeriod) =>
  jwt.sign(payload, secret, {
    expiresIn: expirartionPeriod,
  });

module.exports = generateAccessToken;
