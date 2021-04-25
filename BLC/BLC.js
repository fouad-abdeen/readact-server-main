/* eslint-disable camelcase */

const validator = require("validator");
const moment = require("moment");

// Data Access Layer Component
const DALC = require("../DALC/DALC");

// Business Rules' Messages
const MESSAGES = require("../Messages/Messages");
const LANGUAGE = require("../Messages/Language");

// Custom Code Generator for Account Verification & Password Reset
const generateCustomCode = require("../customCodeGenerator");

// JWT Token Generator for Authorization
const generateAccessToken = require("../jwtTokenGenerator");

// Mongoose Models
const UserModel = require("../Models/User");
const VerificationCodeModel = require("../Models/AccountVerificationCode");
const locationModel = require("../Models/Location");

// User Types Ids
const ID = require("./UserTypes");

class BLC {
  constructor(language) {
    this._language = language;
  }

  setLanguage(lan) {
    LANGUAGE.init(lan);
    this._language = LANGUAGE.getLanguage();
  }

  //  #region User
  // eslint-disable-next-line class-methods-use-this
  async getAllUsersTypes() {
    try {
      const oDALC = new DALC();
      const userTypes = await oDALC.getAllUsersTypes();
      return userTypes;
    } catch (error) {
      return error.message;
    }
  }

  // #region Admin Privileges
  async getSomeUsers(req) {
    const { USER } = MESSAGES[this._language];
    const { user_id } = req.body;
    const admin = await UserModel.findById(user_id).exec();

    if (
      admin.user_type_id !== ID.SuperAdmin &&
      admin.user_type_id !== ID.Admin
    ) {
      throw new Error(USER.USERS_LIST);
    }

    try {
      const oDALC = new DALC();
      const users = await oDALC.getUsers();
      return users.filter((user) => user.user_type_id !== ID.SuperAdmin);
    } catch (error) {
      return error.message;
    }
  }

  async createUser(req) {
    const { USER } = MESSAGES[this._language];
    const user = req.body;
    const { user_id, username, password, user_type_id } = user;
    const admin = await UserModel.findById(user_id).exec();
    const userByUsername = await UserModel.findOne({
      username,
    }).exec();
    const isStrongPassword = validator.isStrongPassword(password);
    const IDs = Object.values(ID);

    if (
      admin.user_type_id !== ID.SuperAdmin &&
      admin.user_type_id !== ID.Admin
    ) {
      throw new Error(USER.USER_CREATION);
    } else if (user_type_id === ID.SuperAdmin) {
      throw new Error(USER.SA_CREATION);
    } else if (userByUsername) {
      throw new Error(USER.USERNAME);
    } else if (!isStrongPassword) {
      throw new Error(USER.PASSWORD);
    } else if (IDs.indexOf(user_type_id) === -1) {
      throw new Error(USER.USER_TYPEID);
    }

    delete user.user_id;
    delete user.language;

    try {
      const oDALC = new DALC();
      const status = await oDALC.createUser(user, password);
      return status;
    } catch (error) {
      return error.message;
    }
  }

  async deleteUser(req) {
    const { USER } = MESSAGES[this._language];
    const { user_id, _id } = req.body;
    const admin = await UserModel.findById(user_id).exec();
    const user = await UserModel.findById(_id).exec();

    if (!user) {
      throw new Error(USER.INEXISTENT_USER);
    } else if (admin.user_type_id !== ID.SuperAdmin) {
      throw new Error(USER.USER_DELETION);
    } else if (user.user_type_id === ID.SuperAdmin) {
      throw new Error(USER.SA_DELETION);
    }

    try {
      const oDALC = new DALC();
      const status = await oDALC.deleteUser(_id);
      return status;
    } catch (error) {
      return error.message;
    }
  }

  async changeUserType(req) {
    const { USER } = MESSAGES[this._language];
    const user = req.body;
    const new_user_type = user.user_type_id;
    const admin = await UserModel.findById(user.user_id).exec();
    const { user_type_id } = admin;
    const IDs = Object.values(ID);

    if (user_type_id !== ID.SuperAdmin && user_type_id !== ID.Admin) {
      throw new Error(USER.USER_TYPE_CHANGE);
    } else if (user_type_id === ID.Admin && new_user_type === ID.Admin) {
      throw new Error(USER.ADMIN_TYPE_ASSIGN);
    } else if (new_user_type === ID.SuperAdmin) {
      throw new Error(USER.SA_TYPE_ASSIGN);
    } else if (IDs.indexOf(new_user_type) === -1) {
      throw new Error(USER.USER_TYPEID);
    } else {
      const user_data = await UserModel.findById(user._id).exec();

      if (!user_data) {
        throw new Error(USER.INEXISTENT_USER);
      } else {
        const current_user_type = user_data.user_type_id;

        if (user_type_id === ID.Admin && current_user_type === ID.Admin) {
          throw new Error(USER.ADMIN_TYPE_CHANGE);
        } else if (current_user_type === ID.SuperAdmin) {
          throw new Error(USER.SA_TYPE_CHANGE);
        } else if (current_user_type === new_user_type) {
          throw new Error(USER.UNCHANGED_USER_TYPE);
        }
      }
    }

    try {
      const oDALC = new DALC();
      const status = await oDALC.changeUserType(user._id, new_user_type);
      return status;
    } catch (error) {
      return error.message;
    }
  }

  async changeLocation(req) {
    const { USER } = MESSAGES[this._language];
    const { user_id, _id, location_id } = req.body;
    const admin = await UserModel.findById(user_id).exec();
    const user = await UserModel.findById(_id).exec();

    if (!user) {
      throw new Error(USER.INEXISTENT_USER);
    } else if (
      admin.user_type_id !== ID.SuperAdmin &&
      admin.user_type_id !== ID.Admin
    ) {
      throw new Error(USER.LOCATION_CHANGE);
    } else if (
      admin.user_type_id === ID.Admin &&
      user.user_type_id === ID.Admin
    ) {
      throw new Error(USER.ADMIN_LOCATION_CHANGE);
    } else if (user.user_type_id === ID.SuperAdmin) {
      throw new Error(USER.SA_LOCATION_CHANGE);
    } else if (location_id === user.location_id.toString()) {
      throw new Error(USER.UNCHANGED_LOCATION);
    }

    try {
      const oDALC = new DALC();
      const status = await oDALC.changeLocation(user._id, location_id);
      return status;
    } catch (error) {
      return error.message;
    }
  }
  // #endregion

  async authenticateUser(req) {
    const { USER } = MESSAGES[this._language];
    const provided_data = req.body;
    const { credential, password } = provided_data;
    const user_data = await UserModel.findOne({
      $or: [{ username: credential }, { email_address: credential }],
    }).exec();

    if (!user_data) {
      throw new Error(USER.CREDENTIAL_CHECK);
    } else {
      const isValidPassword = user_data.validPassword(password);
      if (!isValidPassword) throw new Error(USER.PASSWORD_CHECK);
    }

    const { _id, username } = user_data;
    const token = await generateAccessToken({ _id, username });

    try {
      return { token, _id, username };
    } catch (error) {
      return error.message;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getAllUsers() {
    try {
      const oDALC = new DALC();
      const users = await oDALC.getUsers();
      return users;
    } catch (error) {
      return error.message;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getUsersByLocation(req) {
    const { location_id } = req.body;

    try {
      const oDALC = new DALC();
      const users = await oDALC.getUsersByLocation(location_id);

      const usersData = await users.map((user) => {
        const userData = {};
        const {
          first_name_en,
          first_name_ar,
          last_name_en,
          last_name_ar,
          full_address_en,
          full_address_ar,
          mobile_number,
          is_profile_completed,
        } = user;

        userData.first_name_en = first_name_en;
        userData.first_name_ar = first_name_ar;
        userData.last_name_en = last_name_en;
        userData.last_name_ar = last_name_ar;
        userData.full_address_en = full_address_en;
        userData.full_address_ar = full_address_ar;
        userData.mobile_number = mobile_number;

        if (is_profile_completed) return userData;

        return null;
      });

      return usersData.filter((user) => user);
    } catch (error) {
      return error.message;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getUser(req) {
    const user_id = req.body._id;
    try {
      const oDALC = new DALC();
      const user = await oDALC.getUser(user_id);
      return user;
    } catch (error) {
      return error.message;
    }
  }

  async editUser(req) {
    const { USER } = MESSAGES[this._language];
    const currentUser = req.body;
    const {
      _id,
      username,
      email_address,
      first_name_en,
      first_name_ar,
      last_name_en,
      last_name_ar,
      full_address_en,
      full_address_ar,
    } = currentUser;
    const isValidEmail = validator.isEmail(email_address);
    const isValidMobileNumber = validator.isMobilePhone(
      currentUser.mobile_number
    );

    if (!isValidEmail) {
      throw new Error(USER.EMAIL);
    } else if (!isValidMobileNumber) {
      throw new Error(USER.MOBILE);
    } else if (
      typeof first_name_en !== "string" ||
      typeof first_name_ar !== "string"
    ) {
      throw new Error(USER.FIRST_NAME);
    } else if (
      typeof last_name_en !== "string" ||
      typeof last_name_ar !== "string"
    ) {
      throw new Error(USER.LAST_NAME);
    } else if (first_name_en.length < 2 || first_name_ar.length < 2) {
      throw new Error(USER.FIRST_NAME);
    } else if (last_name_en.length < 2 || last_name_ar.length < 2) {
      throw new Error(USER.LAST_NAME);
    } else if (username.length < 4) {
      throw new Error(USER.INVALID_USERNAME);
    } else if (
      typeof full_address_en !== "string" ||
      typeof full_address_ar !== "string"
    ) {
      throw new Error(USER.ADDRESS);
    } else if (full_address_en.length < 20 || full_address_ar.length < 20) {
      throw new Error(USER.ADDRESS_LENGTH);
    } else if (email_address !== currentUser.email_address_confirmation) {
      throw new Error(USER.EMAIL_CONFIRMATION);
    } else {
      const userByUsername = await UserModel.findOne({
        username,
      }).exec();

      // Username exists
      if (
        userByUsername &&
        userByUsername._id.toString() !== currentUser._id &&
        currentUser._id
      ) {
        throw new Error(USER.USERNAME);
      } else {
        // Email exists
        const userByEmail = await UserModel.findOne({
          email_address,
        }).exec();

        if (
          userByEmail &&
          userByEmail._id.toString() !== currentUser._id &&
          currentUser._id
        ) {
          throw new Error(USER.EMAIL_EXISTS);
        } else {
          const userByID = await UserModel.findById(_id).exec();
          const { user_type_id } = userByID;

          if (user_type_id !== ID.SuperAdmin && user_type_id !== ID.Admin) {
            delete currentUser._id;
            delete currentUser.password;
            delete currentUser.is_verified;
            delete currentUser.is_verification_requested;
            delete currentUser.email_address_confirmation;
            delete currentUser.user_type_id;
            delete currentUser.location_id;
          } else {
            delete currentUser._id;
            delete currentUser.password;
            delete currentUser.is_verified;
            delete currentUser.is_verification_requested;
            delete currentUser.email_address_confirmation;
            delete currentUser.user_type_id;
          }
        }
      }
    }

    currentUser.is_profile_completed = true;

    try {
      const oDALC = new DALC();
      const status = await oDALC.editUser(_id, currentUser);
      return status;
    } catch (error) {
      return error.message;
    }
  }

  async changePassword(req) {
    const { USER } = MESSAGES[this._language];
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
      delete currentUser._id;
      delete currentUser.password_check;
      delete currentUser.password;
      delete currentUser.password_confirmation;
    }

    try {
      const oDALC = new DALC();
      const status = await oDALC.changePassword(user_id, newPassword);
      return status;
    } catch (error) {
      return error.message;
    }
  }

  async requestVerificationCode(req) {
    const { USER } = MESSAGES[this._language];
    const user = req.body;
    const user_id = user._id;
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
    } else {
      const verificationRequest = await VerificationCodeModel.findOne({
        user_id,
      }).exec();

      if (verificationRequest) {
        throw new Error(USER.REQUESTED_VERIFICATION);
      }
    }

    const code = await generateCustomCode(
      user.first_name_en,
      user.last_name_en
    );
    const date = moment();

    try {
      const oDALC = new DALC();
      const status = await oDALC.requestVerificationCode(
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
  }

  async verifyAccount(req) {
    const { USER } = MESSAGES[this._language];
    const user = req.body;
    const user_id = user._id;
    const verfication_request = await VerificationCodeModel.findOne({
      user_id,
    }).exec();

    if (!verfication_request) {
      throw new Error(USER.INEXISTENT_VERIFICATION_CODE);
    } else {
      const { code } = verfication_request;
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
            { is_expired: true }
          );

          throw new Error(USER.EXPIRED_VERIFICATION_CODE);
        }
      }

      const user_data = await UserModel.findById(user_id).exec();
      const isVerified = user_data.is_verified;

      if (isVerified) {
        throw new Error(USER.VERIFIED_ACCOUNT);
      }
    }

    try {
      const oDALC = new DALC();
      const status = await oDALC.verifyAccount(user_id);
      return status;
    } catch (error) {
      return error.message;
    }
  }
  //  #endregion

  // #region Location
  async createLocation(req) {
    const { LOCATION } = MESSAGES[this._language];
    const location = req.body;
    const { user_id, title_en, title_ar } = location;
    const admin = await UserModel.findById(user_id).exec();
    const existing_location = await locationModel
      .findOne({
        $or: [{ title_en }, { title_ar }],
      })
      .exec();

    if (
      admin.user_type_id !== ID.SuperAdmin &&
      admin.user_type_id !== ID.Admin
    ) {
      throw new Error(LOCATION.LOCATION_CREATION);
    } else if (typeof title_en !== "string" || typeof title_ar !== "string") {
      throw new Error(LOCATION.INVALID_LOCATION_TITLE);
    } else if (existing_location) {
      throw new Error(LOCATION.USED_LOCATION_TITLE);
    }

    try {
      const oDALC = new DALC();
      const status = await oDALC.createLocation({ title_en, title_ar });
      return status;
    } catch (error) {
      return error.message;
    }
  }
  // #endregion
}

module.exports = BLC;
