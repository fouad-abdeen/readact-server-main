export {};
const validator = require("validator");

// Data Access Layer Component
const _DALC = require("../DALC/DALC");

// Business Rules' Messages
const _MESSAGES = require("../Messages/Messages");
const _LANGUAGE = require("../Messages/Language");

// Mongoose Models
const UserModel = require("../Models/User");

class BLC {
  //  #region User
  get_all_users = async () => {
    try {
      const oDALC = new _DALC();
      const users = await oDALC.get_users();
      return users;
    } catch (error) {
      return error.message;
    }
  };

  get_some_users = async (req) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    const user_id = req.body.user_id;

    if (user_id !== 1 && user_id !== 2) {
      throw new Error(USER.USERS_LIST);
    }

    try {
      const oDALC = new _DALC();
      const users = await oDALC.get_users();
      return users.filter((user) => user.user_type_id !== 1);
    } catch (error) {
      return error.message;
    }
  };

  get_user = async (req) => {
    const user_id = req.body._id;
    try {
      const oDALC = new _DALC();
      const user = await oDALC.get_user(user_id);
      return user;
    } catch (error) {
      return error.message;
    }
  };

  create_user = async (req) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    const user = req.body;
    const user_id = req.body.user_id;
    const user_type_id = req.body.user_type_id;
    const username = await UserModel.findOne({
      username: user.username,
    }).exec();
    const isStrongPassword = validator.isStrongPassword(user.password);

    if (user_id !== 1 && user_id !== 2) {
      throw new Error(USER.USER_CREATION);
    } else if (user_type_id === 1) {
      throw new Error(USER.SA_CREATION);
    } else if (username !== null) {
      throw new Error(USER.USERNAME);
    } else if (!isStrongPassword) {
      throw new Error(USER.PASSWORD);
    }

    try {
      const oDALC = new _DALC();
      const status = await oDALC.create_user(user);
      return status;
    } catch (error) {
      return error.message;
    }
  };

  edit_user = async (req) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    const currentUser = req.body;
    const user_id = currentUser._id;
    const user = await UserModel.findOne({
      username: currentUser.username,
    }).exec();
    const isValidEmail = validator.isEmail(currentUser.email_address);
    const isValidMobileNumber = validator.isMobilePhone(
      currentUser.mobile_number
    );
    const firstNameEn = currentUser.first_name_en;
    const firstNameAr = currentUser.first_name_ar;
    const lastNameEn = currentUser.last_name_en;
    const lastNameAr = currentUser.last_name_ar;

    await UserModel.findById(user_id).exec();

    if (user !== null && user._id.toString() !== currentUser._id) {
      throw new Error(USER.USERNAME);
    } else if (!isValidEmail) {
      throw new Error(USER.EMAIL);
    } else if (!isValidMobileNumber) {
      throw new Error(USER.MOBILE);
    } else if (firstNameEn.length < 2 || firstNameAr.length < 2) {
      throw new Error(USER.FIRST_NAME);
    } else if (lastNameEn.length < 2 || lastNameAr.length < 2) {
      throw new Error(USER.LAST_NAME);
    } else if (
      typeof currentUser.full_address_en !== "string" ||
      typeof currentUser.full_address_ar !== "string"
    ) {
      throw new Error(USER.ADDRESS);
    }

    delete currentUser["_id"];
    delete currentUser["password"];
    delete currentUser["user_type_id"];
    delete currentUser["location_id"];

    try {
      const oDALC = new _DALC();
      const status = await oDALC.edit_user(user_id, currentUser);
      return status;
    } catch (error) {
      return error.message;
    }
  };

  delete_user = async (req) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    const user = req.body;

    if (user.user_id !== 1) {
      throw new Error(USER.USER_DELETION);
    } else if (user.user_type_id === 1) {
      throw new Error(USER.SA_DELETION);
    }

    try {
      const oDALC = new _DALC();
      const status = await oDALC.delete_user(user._id);
      return status;
    } catch (error) {
      return error.message;
    }
  };
  //  #endregion
}

module.exports = BLC;
