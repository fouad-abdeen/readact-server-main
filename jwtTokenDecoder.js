/* eslint-disable camelcase */
require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.TOKEN_SECRET;

const decodeToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return error.message;
  }
};

module.exports = decodeToken;
