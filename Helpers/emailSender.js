// Emails Content (Subject & HTML Body)
const {
  verificationEmailEnSubject,
  verificationEmailArSubject,
  passwordResetEmailEnSubject,
  passwordResetEmailArSubject,
  setEnVerificationEmail,
  setArVerificationEmail,
  setEnPasswordResetEmail,
  setArPasswordResetEmail,
} = require("./emailContentSetters");

// Email Service
const email = require("../Services/EmailService");

// Messages
const MESSAGES = require("../Messages/Messages");

const sendMail = async (
  firstNameAr,
  firstNameEn,
  emailAddress,
  url,
  language,
  type
) => {
  const { USER } = MESSAGES[language];

  let mailSubject;
  let mailBody;

  if (type === "verification") {
    if (language === "AR") {
      mailSubject = verificationEmailArSubject;
      mailBody = setArVerificationEmail(firstNameAr, emailAddress, url);
    } else {
      mailSubject = verificationEmailEnSubject;
      mailBody = setEnVerificationEmail(firstNameEn, emailAddress, url);
    }
  } else if (type === "passwordReset") {
    if (language === "AR") {
      mailSubject = passwordResetEmailArSubject;
      mailBody = setArPasswordResetEmail(firstNameAr, emailAddress, url);
    } else {
      mailSubject = passwordResetEmailEnSubject;
      mailBody = setEnPasswordResetEmail(firstNameEn, emailAddress, url);
    }
  }

  const mailOptions = email.setMailOptions(emailAddress, mailSubject, mailBody);

  let successfullMail = true;

  email.transporter.sendMail(mailOptions, (error) => {
    if (error) successfullMail = false;
  });

  await new Promise((done) => setTimeout(() => done(), 1700));

  if (!successfullMail) throw new Error(USER.FAILED_MAIL);
};

module.exports = sendMail;
