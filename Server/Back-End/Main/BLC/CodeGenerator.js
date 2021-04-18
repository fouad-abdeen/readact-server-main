const moment = require("moment");

const code_generator = (first_name, last_name) => {
  if (typeof first_name !== "string") {
    throw new Error("Invalid First Name!");
  } else if (typeof last_name !== "string") {
    throw new Error("Invalid Last Name!");
  }

  try {
    const FN = first_name.slice(0, 2);
    const LN = last_name.slice(0, 2);
    const CH1 = "ABCDEGHIJKLM".slice(0, first_name.length);
    const CH2 = "nopqrstuvwxyz".slice(0, last_name.length);
    const NOW = moment().format("YYYYMMDDHHmmssSS");
    const RANDOM = Math.random().toString().slice(10);

    const code = CH1 + FN + NOW + CH2 + LN + RANDOM;
    const code_chars = code.split("");

    // Fisher–Yates shuffle Algorithm
    for (let i = code_chars.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [code_chars[i], code_chars[j]] = [code_chars[j], code_chars[i]];
    }

    return code_chars.join("");
  } catch (error) {
    return {
      message: error.message || "Some error occured while generating the code",
    };
  }
};

module.exports = code_generator;
