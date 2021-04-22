export {};
// Mongoose Models
const UserModel = require("../Models/User");
const UserTypeModel = require("../Models/UserType");
const LocationModel = require("../Models/Location");
const VerificationCodeModel = require("../Models/AccountVerificationCode");

// Messages
const _MESSAGES = require("../Messages/Messages");
const _LANGUAGE = require("../Messages/Language");

class DALC {
  // #region User
  get_users = () => {
    try {
      return UserModel.find({});
    } catch (error) {
      return error.message;
    }
  };

  get_all_user_types = () => {
    try {
      return UserTypeModel.find({});
    } catch (error) {
      return error.message;
    }
  };

  // #region Admin Privileges
  create_user = async (user, password) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      const newUser = new UserModel(user);
      newUser.setPassword(password);
      await newUser.save();
      return USER.SUCCESSFULL_CREATION;
    } catch (error) {
      return error.message;
    }
  };

  delete_user = async (_id) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      const user = await UserModel.findOneAndRemove({ _id });
      return user.username + USER.SUCCESSFULL_DELETETION;
    } catch (error) {
      return error.message;
    }
  };

  change_user_type = async (_id, user_type_id) => {
    const UserType = await UserTypeModel.findOne({
      custom_id: user_type_id,
    }).exec();
    const LAN = _LANGUAGE.getLanguage();
    let USER, USER_TYPE_TITLE;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
      USER_TYPE_TITLE = UserType.title_ar;
    } else {
      USER = _MESSAGES.EN.USER;
      USER_TYPE_TITLE = UserType.title_en;
    }

    try {
      await UserModel.findByIdAndUpdate({ _id }, { user_type_id });
      return USER.SUCCESSFULL_USER_TYPE_CHANGE + USER_TYPE_TITLE;
    } catch (error) {
      return error.message;
    }
  };

  change_location = async (_id, location_id) => {
    const Location = await LocationModel.findById({ _id: location_id }).exec();
    const LAN = _LANGUAGE.getLanguage();
    let USER, LOCATION_TITLE;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
      LOCATION_TITLE = Location.title_ar;
    } else {
      USER = _MESSAGES.EN.USER;
      LOCATION_TITLE = Location.title_en;
    }

    try {
      await UserModel.findByIdAndUpdate({ _id }, { location_id });
      return USER.SUCCESSFULL_LOCATION_CHANGE + LOCATION_TITLE;
    } catch (error) {
      return error.message;
    }
  };
  // #endregion

  get_user = (_id) => {
    try {
      return UserModel.findById(_id);
    } catch (error) {
      return error.message;
    }
  };

  edit_user = async (_id, user) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      await UserModel.findByIdAndUpdate({ _id }, user, {
        new: true,
      });
      return USER.SUCCESSFULL_UPDATE;
    } catch (error) {
      return error.message;
    }
  };

  change_password = async (_id, password) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      const newPassword = new UserModel();
      newPassword.setPassword(password);
      const { salt, hash } = newPassword;
      await UserModel.findByIdAndUpdate({ _id }, { salt, hash });
      return USER.SUCCESSFULL_PASSWORD_CHANGE;
    } catch (error) {
      return error.message;
    }
  };

  request_verification_code = async (
    user_id,
    email_address,
    code,
    request_date
  ) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      const VerficationCodeDoc = new VerificationCodeModel({
        user_id,
        email_address,
        code,
        request_date,
        is_expired: false,
      });
      await VerficationCodeDoc.save();

      await UserModel.findByIdAndUpdate(
        { _id: user_id },
        { is_verification_requested: true }
      );

      return USER.SUCCESSFULL_VERIFICATION_CODE_REQUEST;
    } catch (error) {
      return error.message;
    }
  };

  verify_account = async (_id) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      await UserModel.findByIdAndUpdate({ _id }, { is_verified: true });

      return USER.SUCCESSFULL_ACCOUNT_VERIFICATION;
    } catch (error) {
      return error.message;
    }
  };
  // #endregion
}

module.exports = DALC;
