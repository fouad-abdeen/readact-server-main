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
  get_users = async () => {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (error) {
      return error.message;
    }
  };

  get_all_user_types = async () => {
    try {
      const user_types = await UserTypeModel.find({});
      return user_types;
    } catch (error) {
      return error.message;
    }
  };

  // #region Admin Privileges
  create_user = async (user) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      const userDoc = new UserModel(user);
      await userDoc.save();
      return USER.SUCCESSFULL_CREATION;
    } catch (error) {
      return error.message;
    }
  };

  delete_user = async (user_id) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      const user = await UserModel.findOneAndRemove({ _id: user_id });
      return `${user.username}${USER.SUCCESSFULL_DELETETION}`;
    } catch (error) {
      return error.message;
    }
  };

  change_user_type = async (user_id, user_type) => {
    const UserType = await UserTypeModel.findOne({
      custom_id: user_type,
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
      UserModel.findByIdAndUpdate(
        { _id: user_id },
        { user_type_id: user_type },
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      return USER.SUCCESSFULL_USER_TYPE_CHANGE + USER_TYPE_TITLE;
    } catch (error) {
      return error.message;
    }
  };

  change_location = async (user_id, location) => {
    const Location = await LocationModel.findById({ _id: location }).exec();
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
      UserModel.findByIdAndUpdate(
        { _id: user_id },
        { location_id: location },
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      return USER.SUCCESSFULL_LOCATION_CHANGE + LOCATION_TITLE;
    } catch (error) {
      return error.message;
    }
  };
  // #endregion

  get_user = async (user_id) => {
    try {
      const user = await UserModel.findOne({ _id: user_id });
      return user;
    } catch (error) {
      return error.message;
    }
  };

  edit_user = async (user_id, user) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      UserModel.findByIdAndUpdate(
        { _id: user_id },
        user,
        {
          new: true,
        },
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      return USER.SUCCESSFULL_UPDATE;
    } catch (error) {
      return error.message;
    }
  };

  change_password = async (user_id, user) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      UserModel.findByIdAndUpdate({ _id: user_id }, user, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
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
      });
      await VerficationCodeDoc.save();

      UserModel.findByIdAndUpdate(
        { _id: user_id },
        { is_verification_requested: true },
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );

      return USER.SUCCESSFULL_VERIF_CODE_REQUEST;
    } catch (error) {
      return error.message;
    }
  };
  // #endregion
}

module.exports = DALC;
