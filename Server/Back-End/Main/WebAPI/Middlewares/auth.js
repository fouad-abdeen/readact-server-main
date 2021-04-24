require("dotenv").config();
const jwt = require("jsonwebtoken");

// Messages
const _MESSAGES = require("../../Messages/Messages");
const _LANGUAGE = require("../../Messages/Language");

const SECRET = process.env.TOKEN_SECRET;

const authorize = (req, res, next) => {
  const LAN = _LANGUAGE.getLanguage();
  let USER;

  if (LAN === "AR") {
    USER = _MESSAGES.AR.USER;
  } else {
    USER = _MESSAGES.EN.USER;
  }

  try {
    const token = req.headers.authorization;
    jwt.verify(token, SECRET);
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).send({ message: USER.UNAUTHORIZED });
  }
};

module.exports = authorize;
