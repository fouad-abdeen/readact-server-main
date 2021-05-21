/* eslint-disable camelcase */
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Helpers
const FORMAT_LANG = require("../../Helpers/langStringFormatter");

// Messages
const MESSAGES = require("../../Messages/Messages");
const LANGUAGE = require("../../Messages/Language");

const SECRET = process.env.TOKEN_SECRET;

const authorize = (req, res, next) => {
  const { language } = req.body;
  if (language) LANGUAGE.init(FORMAT_LANG(language));
  const LAN = LANGUAGE.getLanguage();
  const { USER } = MESSAGES[LAN];

  try {
    const token = req.headers.authorization;
    const { user_id } = jwt.verify(token, SECRET);
    req.body.user_id = user_id;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).send(MESSAGES.FAILURE(USER.UNAUTHORIZED));
  }
};

module.exports = authorize;
