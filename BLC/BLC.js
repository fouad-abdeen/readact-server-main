/* eslint-disable camelcase */

const crypto = require("crypto");
const validator = require("validator");
const moment = require("moment");

// Data Access Layer Component
const DALC = require("../DALC/DALC");

// Business Rules' Messages
const MESSAGES = require("../Messages/Messages");
const LANGUAGE = require("../Messages/Language");

// Client Url Parts
const {
  MAIN_URL,
  ACCOUNT_VERFICATION_ROUTE,
  JWT_QUERY_STRING,
} = require("../Config/client");

// #region Helpers
// JWT Token Generator for Authorization
const generateAccessToken = require("../Helpers/jwtTokenGenerator");

// JWT Decoder for Account Verification and Password Reset
const decodeToken = require("../Helpers/jwtTokenDecoder");

// Email Sender for Account Verification and Password Reset
const sendMail = require("../Helpers/emailSender");

// Difference Between Now and a Certain Date in Hours
const getHoursDifference = require("../Helpers/hrsDiffGetter");
// #endregion

// Mongoose Models
const UserModel = require("../Models/User");
const VerificationRequestModel = require("../Models/AccountVerificationRequest");
const PasswordResetRequestModel = require("../Models/PasswordResetRequest");
const Locationmodel = require("../Models/Location");

// User Types (Roles) Ids
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
    const { user_id, username, password, password_confirmation, user_type_id } =
      user;
    const admin = await UserModel.findById(user_id).exec();
    const userByUsername = await UserModel.findOne({
      username,
    }).exec();
    const isStrongPassword = validator.isStrongPassword(password);
    const isConfirmedPassword =
      password.length === password_confirmation.length;
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
    } else if (!isConfirmedPassword) {
      throw new Error(USER.PASSWORD_CONFIRMATION);
    } else if (IDs.indexOf(user_type_id) === -1) {
      throw new Error(USER.USER_TYPEID);
    } else {
      const isTruelyConfirmedPassword = crypto.timingSafeEqual(
        Buffer.from(password),
        Buffer.from(password_confirmation)
      );

      if (!isTruelyConfirmedPassword) {
        throw new Error(USER.PASSWORD_CONFIRMATION);
      }
    }

    delete user.language;
    delete user.user_id;
    delete user.password_confirmation;

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

    const user_id = user_data._id;
    const token = await generateAccessToken({ user_id }, 7200);

    try {
      return token;
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
    const _id = currentUser.user_id;
    const {
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
            delete currentUser.email_address_confirmation;
            delete currentUser.user_type_id;
            delete currentUser.location_id;
          } else {
            delete currentUser._id;
            delete currentUser.password;
            delete currentUser.is_verified;
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
    const { user_id } = currentUser;
    const oldPassword = currentUser.password_check;
    const newPassword = currentUser.password;
    const confirmationPassword = currentUser.password_confirmation;
    const user = await UserModel.findById(user_id).exec();
    const isValidPassword = user.validPassword(oldPassword);
    const isStrongPassword = validator.isStrongPassword(newPassword);
    const isConfirmedPassword =
      newPassword.length === confirmationPassword.length;

    if (!isValidPassword) {
      throw new Error(USER.PASSWORD_CHECK);
    } else if (!isStrongPassword) {
      throw new Error(USER.PASSWORD);
    } else if (!isConfirmedPassword) {
      throw new Error(USER.PASSWORD_CONFIRMATION);
    } else {
      const isRepeatedPassword = crypto.timingSafeEqual(
        Buffer.from(oldPassword),
        Buffer.from(newPassword)
      );
      const isPasswordTruelyConfirmed = crypto.timingSafeEqual(
        Buffer.from(newPassword),
        Buffer.from(confirmationPassword)
      );

      if (isRepeatedPassword) {
        throw new Error(USER.PASSWORD_UNCHANGED);
      } else if (!isPasswordTruelyConfirmed) {
        throw new Error(USER.PASSWORD_CONFIRMATION);
      }
    }

    try {
      const oDALC = new DALC();
      const status = await oDALC.changePassword(user_id, newPassword);
      return status;
    } catch (error) {
      return error.message;
    }
  }

  async requestVerification(req) {
    const { USER } = MESSAGES[this._language];
    const { user_id } = req.body;
    const user_data = await UserModel.findById(user_id).exec();
    const { first_name_en, first_name_ar, email_address } = user_data;

    const isVerified = user_data.is_verified;
    const isProfileCompleted = user_data.is_profile_completed;

    const verificationRequest = await VerificationRequestModel.findOne({
      user_id,
    }).exec();

    if (verificationRequest && !isVerified) {
      const { request_date } = verificationRequest;
      const difference = getHoursDifference(request_date);

      if (difference > 48) {
        await VerificationRequestModel.findOneAndRemove({ user_id });
      } else {
        throw new Error(USER.REQUESTED_VERIFICATION(48 - difference));
      }
    } else if (!isProfileCompleted) {
      throw new Error(USER.INCOMPLETE_PROFILE);
    } else if (isVerified) {
      throw new Error(USER.VERIFIED_ACCOUNT);
    }

    const token = await generateAccessToken({ user_id }, 172800);
    const url =
      MAIN_URL +
      this._language.toLowerCase() +
      ACCOUNT_VERFICATION_ROUTE +
      JWT_QUERY_STRING +
      token;

    await sendMail(
      first_name_ar,
      first_name_en,
      email_address,
      url,
      this._language,
      "verification"
    );

    const date = moment();

    try {
      const oDALC = new DALC();
      const status = await oDALC.requestVerification(
        user_id,
        email_address,
        date
      );

      return status;
    } catch (error) {
      return error.message;
    }
  }

  async verifyAccount(req) {
    const { USER } = MESSAGES[this._language];
    const { token } = req.body;
    const decodedTokenResult = decodeToken(token);
    const mockedResult = decodedTokenResult.toString().split(" ");

    if (mockedResult[0] === "invalid" || mockedResult[0] === "Unexpected") {
      throw new Error(USER.VERIFICATION_URL);
    } else if (mockedResult[1] === "expired") {
      throw new Error(USER.EXPIRED_VERIFICATION_URL);
    }

    const { user_id } = decodedTokenResult;
    const verficationRequest = await VerificationRequestModel.findOne({
      user_id,
    }).exec();

    if (!verficationRequest) {
      throw new Error(USER.INEXISTENT_VERIFICATION_REQUEST);
    } else {
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

  async requestPasswordReset(req) {
    const { USER } = MESSAGES[this._language];
    const { credential } = req.body;
    const user_data = await UserModel.findOne({
      $or: [{ username: credential }, { email_address: credential }],
    }).exec();

    if (!user_data) throw new Error(USER.CREDENTIAL_CHECK);

    const { first_name_en, first_name_ar, email_address, _id, is_verified } =
      user_data;
    const passwordResetRequest = await PasswordResetRequestModel.findOne({
      user_id: _id,
    }).exec();

    const isVerified = is_verified;
    const user_id = _id;
    let newRequest = true;

    if (!isVerified) {
      throw new Error(USER.UNVERIFIED_ACCOUNT);
    } else if (passwordResetRequest && isVerified) {
      const { request_date } = passwordResetRequest;
      const difference = getHoursDifference(request_date);
      newRequest = false;

      if (difference < 24) {
        throw new Error(USER.REQUESTED_PASSWORD_RESET(24 - difference));
      } else if (difference < 48) {
        throw new Error(USER.PASSWORD_RESET_NOT_REQUESTABLE(48 - difference));
      }
    }

    const token = await generateAccessToken({ user_id }, 86400);
    const url =
      MAIN_URL +
      this._language.toLowerCase() +
      ACCOUNT_VERFICATION_ROUTE +
      JWT_QUERY_STRING +
      token;

    await sendMail(
      first_name_ar,
      first_name_en,
      email_address,
      url,
      this._language,
      "passwordReset"
    );

    const completed = false;
    const date = moment();

    try {
      const oDALC = new DALC();
      const status = await oDALC.requestPasswordReset(
        user_id,
        completed,
        date,
        newRequest
      );

      return status;
    } catch (error) {
      return error.message;
    }
  }

  async resetPassword(req) {
    const { USER } = MESSAGES[this._language];
    const { token, password, password_confirmation } = req.body;
    const decodedTokenResult = decodeToken(token);
    const mockedResult = decodedTokenResult.toString().split(" ");

    if (mockedResult[0] === "invalid" || mockedResult[0] === "Unexpected") {
      throw new Error(USER.PASSWORD_RESET_URL);
    } else if (mockedResult[1] === "expired") {
      throw new Error(USER.EXPIRED_PASSWORD_RESET_URL);
    }

    const { user_id } = decodedTokenResult;
    const passwordResetRequest = await PasswordResetRequestModel.findOne({
      user_id,
    }).exec();
    const { completed } = passwordResetRequest;

    if (!passwordResetRequest) {
      throw new Error(USER.INEXISTENT_PASSWORD_RESET_REQUEST);
    } else if (completed) {
      throw new Error(USER.EXPIRED_PASSWORD_RESET_URL);
    } else {
      const user_data = await UserModel.findById(user_id).exec();
      const isVerified = user_data.is_verified;
      const newPassword = password;
      const confirmationPassword = password_confirmation;
      const isStrongPassword = validator.isStrongPassword(newPassword);
      const isConfirmedPassword =
        newPassword.length === confirmationPassword.length;

      if (!isVerified) {
        throw new Error(USER.UNVERIFIED_ACCOUNT);
      } else if (!isStrongPassword) {
        throw new Error(USER.PASSWORD);
      } else if (!isConfirmedPassword) {
        throw new Error(USER.PASSWORD_CONFIRMATION);
      } else {
        const isPasswordTruelyConfirmed = crypto.timingSafeEqual(
          Buffer.from(newPassword),
          Buffer.from(confirmationPassword)
        );

        if (!isPasswordTruelyConfirmed) {
          throw new Error(USER.PASSWORD_CONFIRMATION);
        }
      }
    }

    try {
      const oDALC = new DALC();
      const status = await oDALC.resetPassword(user_id, password);
      return status;
    } catch (error) {
      return error.message;
    }
  }
  //  #endregion

  // #region Location
  // eslint-disable-next-line class-methods-use-this
  async getAllLocations() {
    try {
      const oDALC = new DALC();
      const locations = await oDALC.getAllLocations();
      return locations;
    } catch (error) {
      return error.message;
    }
  }

  async createLocation(req) {
    const { LOCATION } = MESSAGES[this._language];
    const location = req.body;
    const { user_id, title_en, title_ar } = location;
    const admin = await UserModel.findById(user_id).exec();
    const existing_location = await Locationmodel.findOne({
      $or: [{ title_en }, { title_ar }],
    }).exec();

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
      const status = await oDALC.createLocation({
        title_en,
        title_ar,
        editable: true,
        deletable: true,
      });
      return status;
    } catch (error) {
      return error.message;
    }
  }

  async editLocation(req) {
    const { LOCATION } = MESSAGES[this._language];
    const location = req.body;
    const { user_id, _id, title_en, title_ar } = location;
    const admin = await UserModel.findById(user_id).exec();
    const choosen_location = await Locationmodel.findById(_id).exec();
    const existing_location = await Locationmodel.findOne({
      $or: [{ title_en }, { title_ar }],
    }).exec();

    if (admin.user_type_id !== ID.SuperAdmin) {
      throw new Error(LOCATION.LOCATION_UPDATE);
    } else if (!choosen_location.editable) {
      throw new Error(LOCATION.UNEDITABLE_LOCATION);
    } else if (typeof title_en !== "string" || typeof title_ar !== "string") {
      throw new Error(LOCATION.INVALID_LOCATION_TITLE);
    } else if (existing_location && existing_location._id.toString() !== _id) {
      throw new Error(LOCATION.USED_LOCATION_TITLE);
    }

    try {
      const oDALC = new DALC();
      const status = oDALC.editLocation(_id, { title_en, title_ar });
      return status;
    } catch (error) {
      return error.message;
    }
  }

  async deleteLocation(req) {
    const { LOCATION } = MESSAGES[this._language];
    const location = req.body;
    const { user_id, _id } = location;
    const admin = await UserModel.findById(user_id).exec();
    const choosen_location = await Locationmodel.findById(_id).exec();

    if (admin.user_type_id !== ID.SuperAdmin) {
      throw new Error(LOCATION.LOCATION_DELETION);
    } else if (!choosen_location) {
      throw new Error(LOCATION.INEXISTENT_LOCATION);
    } else if (!choosen_location.deletable) {
      throw new Error(LOCATION.UNDELETABLE_LOCATION);
    }

    try {
      const oDALC = new DALC();
      const status = oDALC.deleteLocation(_id);
      return status;
    } catch (error) {
      return error.message;
    }
  }
  // #endregion
}

module.exports = BLC;
