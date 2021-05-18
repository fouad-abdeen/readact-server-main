require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.G_EMAIL,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

const setMailOptions = (to, subject, html) => ({
  from: process.env.G_EMAIL,
  to,
  subject,
  html,
});

module.exports.transporter = transporter;
module.exports.setMailOptions = setMailOptions;
