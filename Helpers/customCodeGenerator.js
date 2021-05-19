/* eslint-disable no-plusplus */
const moment = require("moment");

const generateCode = (firstName, lastName) => {
  const FN = firstName;
  const LN = lastName;

  if (typeof FN !== "string") {
    throw new Error("Invalid First Name!");
  } else if (typeof LN !== "string") {
    throw new Error("Invalid Last Name!");
  }

  try {
    const CH1 = "ABCDEFGHIJKLM".slice(0, FN.length);
    const CH2 = "nopqrstuvwxyz".slice(0, LN.length);
    const NOW = moment().format("YYYYMMDDHHmmssSS");
    const RANDOM = Math.random().toString().slice(10);

    const code = CH1 + FN + NOW + CH2 + LN + RANDOM;
    const codeChars = code.split("");

    // Fisher–Yates shuffle Algorithm
    for (let i = codeChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [codeChars[i], codeChars[j]] = [codeChars[j], codeChars[i]];
    }

    return codeChars.join("");
  } catch (error) {
    return error.message;
  }
};

module.exports = generateCode;
