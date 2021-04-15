export {};
const validator = require("validator");
const _DALC = require("../DALC/DALC");

const UserModel = require("../Models/User");

class BLC {
  get_all_users = (req) => {
    return req.body;
  };

  create_user = async (req) => {
    const user = req.body;
    const username = await UserModel.findOne({
      username: user.username,
    }).exec();
    const isValidEmail = validator.isEmail(user.email_address);
    const isValidMobileNumber = validator.isMobilePhone(user.mobile_number);

    if (username !== null) {
      throw new Error("Username exists!");
    } else if (!isValidEmail) {
      throw new Error("Invalid Email Address!");
    } else if (!isValidMobileNumber) {
      throw new Error("Invalid Mobile Number!");
    }

    try {
      const oDALC = new _DALC();
      const status = await oDALC.create_user(req);
      return status;
    } catch (error) {
      return error.message;
    }
  };
}

module.exports = BLC;
