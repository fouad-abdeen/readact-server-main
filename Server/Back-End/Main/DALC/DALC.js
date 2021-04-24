/* eslint-disable camelcase */

// Mongoose Models
const UserModel = require("../Models/User");
const UserTypeModel = require("../Models/UserType");
const LocationModel = require("../Models/Location");
const VerificationCodeModel = require("../Models/AccountVerificationCode");

// Messages
const MESSAGES = require("../Messages/Messages");
const LANGUAGE = require("../Messages/Language");

class DALC {
  constructor() {
    // #region User
    this.get_users = () => {
      try {
        return UserModel.find({});
      } catch (error) {
        return error.message;
      }
    };

    this.get_all_user_types = () => {
      try {
        return UserTypeModel.find({});
      } catch (error) {
        return error.message;
      }
    };

    // #region Admin Privileges
    this.create_user = async (user, password) => {
      const LAN = LANGUAGE.getLanguage();
      let USER;

      if (LAN === "AR") {
        USER = MESSAGES.AR.USER;
      } else {
        USER = MESSAGES.EN.USER;
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

    this.delete_user = async (_id) => {
      const LAN = LANGUAGE.getLanguage();
      let USER;

      if (LAN === "AR") {
        USER = MESSAGES.AR.USER;
      } else {
        USER = MESSAGES.EN.USER;
      }

      try {
        const user = await UserModel.findOneAndRemove({ _id });
        return user.username + USER.SUCCESSFULL_DELETETION;
      } catch (error) {
        return error.message;
      }
    };

    this.change_user_type = async (_id, user_type_id) => {
      const UserType = await UserTypeModel.findOne({
        custom_id: user_type_id,
      }).exec();
      const LAN = LANGUAGE.getLanguage();
      let USER;
      let USER_TYPE_TITLE;

      if (LAN === "AR") {
        USER = MESSAGES.AR.USER;
        USER_TYPE_TITLE = UserType.title_ar;
      } else {
        USER = MESSAGES.EN.USER;
        USER_TYPE_TITLE = UserType.title_en;
      }

      try {
        await UserModel.findByIdAndUpdate({ _id }, { user_type_id });
        return USER.SUCCESSFULL_USER_TYPE_CHANGE + USER_TYPE_TITLE;
      } catch (error) {
        return error.message;
      }
    };

    this.change_location = async (_id, location_id) => {
      const Location = await LocationModel.findById({
        _id: location_id,
      }).exec();
      const LAN = LANGUAGE.getLanguage();
      let USER;
      let LOCATION_TITLE;

      if (LAN === "AR") {
        USER = MESSAGES.AR.USER;
        LOCATION_TITLE = Location.title_ar;
      } else {
        USER = MESSAGES.EN.USER;
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

    this.get_users_by_location = (location_id) => {
      try {
        return UserModel.find({ location_id });
      } catch (error) {
        return error.message;
      }
    };

    this.get_user = (_id) => {
      try {
        return UserModel.findById(_id);
      } catch (error) {
        return error.message;
      }
    };

    this.edit_user = async (_id, user) => {
      const LAN = LANGUAGE.getLanguage();
      let USER;

      if (LAN === "AR") {
        USER = MESSAGES.AR.USER;
      } else {
        USER = MESSAGES.EN.USER;
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

    this.change_password = async (_id, password) => {
      const LAN = LANGUAGE.getLanguage();
      let USER;

      if (LAN === "AR") {
        USER = MESSAGES.AR.USER;
      } else {
        USER = MESSAGES.EN.USER;
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

    this.request_verification_code = async (
      user_id,
      email_address,
      code,
      request_date
    ) => {
      const LAN = LANGUAGE.getLanguage();
      let USER;

      if (LAN === "AR") {
        USER = MESSAGES.AR.USER;
      } else {
        USER = MESSAGES.EN.USER;
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

    this.verify_account = async (_id) => {
      const LAN = LANGUAGE.getLanguage();
      let USER;

      if (LAN === "AR") {
        USER = MESSAGES.AR.USER;
      } else {
        USER = MESSAGES.EN.USER;
      }

      try {
        await UserModel.findByIdAndUpdate({ _id }, { is_verified: true });

        return USER.SUCCESSFULL_ACCOUNT_VERIFICATION;
      } catch (error) {
        return error.message;
      }
    };
    // #endregion

    // #region Location
    this.create_location = async (location) => {
      const LAN = LANGUAGE.getLanguage();
      let LOCATION;

      if (LAN === "AR") {
        LOCATION = MESSAGES.AR.LOCATION;
      } else {
        LOCATION = MESSAGES.EN.LOCATION;
      }

      try {
        const newLocation = new LocationModel(location);
        await newLocation.save();
        return LOCATION.SUCCESSFULL_CREATION;
      } catch (error) {
        return error.message;
      }
    };
    // #endregion
  }
}

module.exports = DALC;
