export {};
const validator = require("validator");
const moment = require("moment");

// Data Access Layer Component
const _DALC = require("../DALC/DALC");

// Business Rules' Messages
const _MESSAGES = require("../Messages/Messages");
const _LANGUAGE = require("../Messages/Language");

// Code Generator for Account Verification & Password Reset
const _CODE_GENERATOR = require("./CodeGenerator");

// User Types Ids
const _ID = require("./UserTypes");

// Mongoose Models
const UserModel = require("../Models/User");
const VerificationCodeModel = require("../Models/AccountVerificationCode");

class BLC {
  //  #region User
  get_all_user_types = async () => {
    try {
      const oDALC = new _DALC();
      const user_types = await oDALC.get_all_user_types();
      return user_types;
    } catch (error) {
      return error.message;
    }
  };

  // #region Admin Privileges
  get_some_users = async (req) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    const user_id = req.body.user_id;

    if (user_id !== _ID.SuperAdmin && user_id !== _ID.Admin) {
      throw new Error(USER.USERS_LIST);
    }

    try {
      const oDALC = new _DALC();
      const users = await oDALC.get_users();
      return users.filter((user) => user.user_type_id !== _ID.SuperAdmin);
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
    const password = user.password;
    const user_id = req.body.user_id;
    const user_type_id = req.body.user_type_id;
    const username = await UserModel.findOne({
      username: user.username,
    }).exec();
    const isStrongPassword = validator.isStrongPassword(password);
    const IDs = Object.values(_ID);

    if (user_id !== _ID.SuperAdmin && user_id !== _ID.Admin) {
      throw new Error(USER.USER_CREATION);
    } else if (user_type_id === _ID.SuperAdmin) {
      throw new Error(USER.SA_CREATION);
    } else if (username !== null) {
      throw new Error(USER.USERNAME);
    } else if (!isStrongPassword) {
      throw new Error(USER.PASSWORD);
    } else if (IDs.indexOf(user_type_id) === -1) {
      throw new Error(USER.USER_TYPE_ID);
    }

    try {
      const oDALC = new _DALC();
      const status = await oDALC.create_user(user, password);
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

    if (user.user_id !== _ID.SuperAdmin) {
      throw new Error(USER.USER_DELETION);
    } else if (user.user_type_id === _ID.SuperAdmin) {
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

  change_user_type = async (req) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    const user = req.body;
    const user_id = user.user_id;
    const currentUser = await UserModel.findById(user._id).exec();
    const current_user_type = currentUser.user_type_id;
    const new_user_type = user.user_type_id;
    const IDs = Object.values(_ID);

    if (user_id !== _ID.SuperAdmin && user_id !== _ID.Admin) {
      throw new Error(USER.USER_TYPE_CHANGE);
    } else if (user_id === 2 && current_user_type === _ID.Admin) {
      throw new Error(USER.ADMIN_TYPE_CHANGE);
    } else if (user_id === 2 && new_user_type === _ID.Admin) {
      throw new Error(USER.ADMIN_TYPE_ASSIGN);
    } else if (current_user_type === _ID.SuperAdmin) {
      throw new Error(USER.SA_TYPE_CHANGE);
    } else if (new_user_type === _ID.SuperAdmin) {
      throw new Error(USER.SA_TYPE_ASSIGN);
    } else if (IDs.indexOf(new_user_type) === -1) {
      throw new Error(USER.USER_TYPE_ID);
    }

    try {
      const oDALC = new _DALC();
      const status = await oDALC.change_user_type(user._id, new_user_type);
      return status;
    } catch (error) {
      return error.message;
    }
  };

  change_location = async (req) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    const user = req.body;
    const user_id = user.user_id;
    const user_type_id = user.user_type_id;
    const location_id = user.location_id;

    if (user_id !== _ID.SuperAdmin && user_id !== _ID.Admin) {
      throw new Error(USER.LOCATION_CHANGE);
    } else if (user_id === _ID.Admin && user_type_id === _ID.Admin) {
      throw new Error(USER.ADMIN_LOCATION_CHANGE);
    } else if (user_type_id === _ID.SuperAdmin) {
      throw new Error(USER.SA_LOCATION_CHANGE);
    }

    await UserModel.findById(user._id).exec();

    try {
      const oDALC = new _DALC();
      const status = await oDALC.change_location(user._id, location_id);
      return status;
    } catch (error) {
      return error.message;
    }
  };
  // #endregion

  get_all_users = async () => {
    try {
      const oDALC = new _DALC();
      const users = await oDALC.get_users();
      return users;
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
    const user_type_id = currentUser.user_type_id;

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
    } else if (
      currentUser.email_address !== currentUser.email_address_confirmation
    ) {
      throw new Error(USER.EMAIL_CONFIRMATION);
    } else {
      if (user_type_id !== _ID.SuperAdmin && user_type_id !== _ID.Admin) {
        delete currentUser["_id"];
        delete currentUser["password"];
        delete currentUser["email_address_confirmation"];
        delete currentUser["user_type_id"];
        delete currentUser["location_id"];
      } else {
        delete currentUser["_id"];
        delete currentUser["password"];
        delete currentUser["email_address_confirmation"];
        delete currentUser["user_type_id"];
      }
    }

    const user_data = await UserModel.findById(user_id).exec();
    const isVerified = user_data.is_verified;

    if (isVerified === false) {
      currentUser["is_verified"] = false;
      currentUser["is_verification_requested"] = false;
      currentUser["is_profile_completed"] = true;
    }

    try {
      const oDALC = new _DALC();
      const status = await oDALC.edit_user(user_id, currentUser);
      return status;
    } catch (error) {
      return error.message;
    }
  };

  change_password = async (req) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    const currentUser = req.body;
    const user_id = currentUser._id;
    const oldPassword = currentUser.password_check;
    const newPassword = currentUser.password;
    const user = await UserModel.findById(user_id).exec();
    const isValidPassword = user.validPassword(oldPassword);
    const isStrongPassword = validator.isStrongPassword(newPassword);

    if (!isValidPassword) {
      throw new Error(USER.PASSWORD_CHECK);
    } else if (newPassword !== currentUser.password_confirmation) {
      throw new Error(USER.PASSWORD_CONFIRMATION);
    } else if (oldPassword === newPassword) {
      throw new Error(USER.PASSWORD_UNCHANGED);
    } else if (!isStrongPassword) {
      throw new Error(USER.PASSWORD);
    } else {
      delete currentUser["_id"];
      delete currentUser["password_check"];
      delete currentUser["password"];
      delete currentUser["password_confirmation"];
    }

    try {
      const oDALC = new _DALC();
      const status = await oDALC.change_password(user_id, newPassword);
      return status;
    } catch (error) {
      return error.message;
    }
  };

  request_verification_code = async (req) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    const user = req.body;
    const user_id = user.user_id;
    const user_data = await UserModel.findById(user_id).exec();

    const isVerified = user_data.is_verified;
    const isVerificationRequested = user_data.is_verification_requested;
    const isProfileCompleted = user_data.is_profile_completed;

    if (!isProfileCompleted) {
      throw new Error(USER.ICOMPLETE_PROFILE);
    } else if (isVerificationRequested && !isVerified) {
      throw new Error(USER.REQUESTED_VERIFICATION);
    } else if (isVerified) {
      throw new Error(USER.VERIFIED_ACCOUNT);
    }

    const code = await _CODE_GENERATOR(user.first_name_en, user.last_name_en);
    const date = moment();

    try {
      const oDALC = new _DALC();
      const status = await oDALC.request_verification_code(
        user_id,
        user.email_address,
        code,
        date
      );

      // Send verification code by email

      return status;
    } catch (error) {
      return error.message;
    }
  };

  verify_account = async (req) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    const user = req.body;
    const user_id = user._id;
    const verfication_request = await VerificationCodeModel.findOne({
      user_id,
    }).exec();
    const code = verfication_request.code;
    const isExpired = verfication_request.is_expired;
    const date = verfication_request.request_date;

    if (code !== user.code) {
      throw new Error(USER.VERIFICATION_CODE);
    } else if (isExpired) {
      throw new Error(USER.EXPIRED_VERIFICATION_CODE);
    } else {
      const now = moment();
      const difference = now.diff(date, "hours");

      if (difference > 48) {
        await VerificationCodeModel.findOneAndUpdate(
          { code },
          { is_expired: true },
          (err) => {
            if (err) {
              throw new Error(err);
            }
          }
        );

        throw new Error(USER.EXPIRED_VERIFICATION_CODE);
      }

      const user_data = await UserModel.findById(user_id).exec();
      const isVerified = user_data.is_verified;

      if (isVerified) {
        throw new Error(USER.VERIFIED_ACCOUNT);
      }
    }

    try {
      const oDALC = new _DALC();
      const status = await oDALC.verify_account(user_id);
      return status;
    } catch (error) {
      return error.message;
    }
  };
  //  #endregion
}

module.exports = BLC;
