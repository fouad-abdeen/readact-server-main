/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

// Mongoose Models
const UserModel = require("../Models/User");
const UserTypeModel = require("../Models/UserType");
const LocationModel = require("../Models/Location");
const VerificationRequestModel = require("../Models/AccountVerificationRequest");

// Messages
const MESSAGES = require("../Messages/Messages");
const LANGUAGE = require("../Messages/Language");

class DALC {
  constructor(language) {
    this._language = language;
    this.setLanguage();
  }

  setLanguage() {
    this._language = LANGUAGE.getLanguage();
  }

  // #region User
  getUsers() {
    try {
      return UserModel.find({});
    } catch (error) {
      return error.message;
    }
  }

  getAllUsersTypes() {
    try {
      return UserTypeModel.find({});
    } catch (error) {
      return error.message;
    }
  }

  // #region Admin Privileges
  async createUser(user, password) {
    const { USER } = MESSAGES[this._language];
    try {
      const newUser = new UserModel(user);
      newUser.setPassword(password);
      await newUser.save();
      return USER.SUCCESSFULL_CREATION;
    } catch (error) {
      return error.message;
    }
  }

  async deleteUser(_id) {
    const { USER } = MESSAGES[this._language];
    try {
      const user = await UserModel.findOneAndRemove({ _id });
      return user.username + USER.SUCCESSFULL_DELETION;
    } catch (error) {
      return error.message;
    }
  }

  async changeUserType(_id, user_type_id) {
    const { USER } = MESSAGES[this._language];
    const UserType = await UserTypeModel.findOne({
      custom_id: user_type_id,
    }).exec();
    let USER_TYPE_TITLE;

    if (this._language === "AR") {
      USER_TYPE_TITLE = UserType.title_ar;
    } else {
      USER_TYPE_TITLE = UserType.title_en;
    }

    try {
      await UserModel.findByIdAndUpdate({ _id }, { user_type_id });
      return USER.SUCCESSFULL_USER_TYPE_CHANGE + USER_TYPE_TITLE;
    } catch (error) {
      return error.message;
    }
  }

  async changeLocation(_id, location_id) {
    const { USER } = MESSAGES[this._language];
    const Location = await LocationModel.findById({
      _id: location_id,
    }).exec();
    let LOCATION_TITLE;

    if (this._language === "AR") {
      LOCATION_TITLE = Location.title_ar;
    } else {
      LOCATION_TITLE = Location.title_en;
    }

    try {
      await UserModel.findByIdAndUpdate({ _id }, { location_id });
      return USER.SUCCESSFULL_LOCATION_CHANGE + LOCATION_TITLE;
    } catch (error) {
      return error.message;
    }
  }
  // #endregion

  async getUsersByLocation(location_id) {
    try {
      return UserModel.find({ location_id });
    } catch (error) {
      return error.message;
    }
  }

  getUser(_id) {
    try {
      return UserModel.findById(_id);
    } catch (error) {
      return error.message;
    }
  }

  async editUser(_id, user) {
    const { USER } = MESSAGES[this._language];
    try {
      await UserModel.findByIdAndUpdate({ _id }, user, {
        new: true,
      });
      return USER.SUCCESSFULL_UPDATE;
    } catch (error) {
      return error.message;
    }
  }

  async changePassword(_id, password) {
    const { USER } = MESSAGES[this._language];
    try {
      const newPassword = new UserModel();
      newPassword.setPassword(password);
      const { salt, hash } = newPassword;
      await UserModel.findByIdAndUpdate({ _id }, { salt, hash });
      return USER.SUCCESSFULL_PASSWORD_CHANGE;
    } catch (error) {
      return error.message;
    }
  }

  async requestVerification(user_id, email_address, request_date) {
    const { USER } = MESSAGES[this._language];
    try {
      const VerificationRequestDoc = new VerificationRequestModel({
        user_id,
        email_address,
        request_date,
      });
      await VerificationRequestDoc.save();

      return USER.SUCCESSFULL_VERIFICATION_URL_REQUEST;
    } catch (error) {
      return error.message;
    }
  }

  async verifyAccount(_id) {
    const { USER } = MESSAGES[this._language];
    try {
      await UserModel.findByIdAndUpdate({ _id }, { is_verified: true });

      return USER.SUCCESSFULL_ACCOUNT_VERIFICATION;
    } catch (error) {
      return error.message;
    }
  }
  // #endregion

  // #region Location
  getAllLocations() {
    try {
      return LocationModel.find({});
    } catch (error) {
      return error.message;
    }
  }

  async createLocation(location) {
    const { LOCATION } = MESSAGES[this._language];
    try {
      const newLocation = new LocationModel(location);
      await newLocation.save();
      return LOCATION.SUCCESSFULL_CREATION;
    } catch (error) {
      return error.message;
    }
  }

  async editLocation(_id, location) {
    const { LOCATION } = MESSAGES[this._language];
    try {
      await UserModel.findByIdAndUpdate({ _id }, location, {
        new: true,
      });
      return LOCATION.SUCCESSFULL_UPDATE;
    } catch (error) {
      return error.message;
    }
  }

  async deleteLocation(_id) {
    const { LOCATION } = MESSAGES[this._language];
    try {
      await LocationModel.findOneAndRemove({ _id });
      return LOCATION.SUCCESSFULL_DELETION;
    } catch (error) {
      return error.message;
    }
  }
  // #endregion
}

module.exports = DALC;
