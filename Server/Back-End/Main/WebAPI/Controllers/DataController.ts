const express = require("express");
const router = express.Router();

// Names of Routes
const routes = require("../Names.Routes");
const {
  createUser,
  getAllUsers,
  getSomeUsers,
  getUser,
  editUser,
  deleteUser,
  changePassword,
  getUserTypes,
  changeUserType,
  changeLocation,
  requestVerificationCode,
} = routes.user;

// Business Logic Component
const _BLC = require("../../BLC/BLC");

// Language for Messages
const _LANGUAGE = require("../../Messages/Language");

// #region Controllers

// #region User
const get_all_user_types = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const user_types = await oBLC.get_all_user_types();
    res.send(user_types);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occured while retrieving User account's types",
    });
  }
};

// #region Admin Privileges
const get_some_users = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const users = await oBLC.get_some_users(req);
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving Users",
    });
  }
};

const create_user = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const user_status = await oBLC.create_user(req);
    res.send(user_status);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while creating the User account",
    });
  }
};

const delete_user = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const user_status = await oBLC.delete_user(req);
    res.send(user_status);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while deleting the User account",
    });
  }
};

const change_user_type = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const status = await oBLC.change_user_type(req);
    res.send(status);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occured while changing User account's type",
    });
  }
};

const change_location = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const status = await oBLC.change_location(req);
    res.send(status);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while changing User's location",
    });
  }
};
// #endregion

const get_all_users = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const users = await oBLC.get_all_users();
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving Users",
    });
  }
};

const get_user = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const user = await oBLC.get_user(req);
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving your data",
    });
  }
};

const edit_user = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const user_status = await oBLC.edit_user(req);
    res.send(user_status);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while updating your data",
    });
  }
};

const change_password = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const password_status = await oBLC.change_password(req);
    res.send(password_status);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while changing your password",
    });
  }
};

const request_verification_code = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const request_status = await oBLC.request_verification_code(req);
    res.send(request_status);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occured while requesting your account verification code",
    });
  }
};
// #endregion

// #endregion

// #region Routes

// #region User
router.get("/" + getAllUsers, get_all_users);
router.get("/" + getSomeUsers, get_some_users);
router.get("/" + getUser, get_user);
router.post("/" + createUser, create_user);
router.put("/" + editUser, edit_user);
router.delete("/" + deleteUser, delete_user);
router.put("/" + changePassword, change_password);
router.post("/" + requestVerificationCode, request_verification_code);
router.get("/" + getUserTypes, get_all_user_types);
router.put("/" + changeUserType, change_user_type);
router.put("/" + changeLocation, change_location);
// #endregion

// #region Language
router.post("/" + routes.changeLanguage, (req, res) => {
  const language = req.body.language;

  if (language !== "EN" && language !== "AR") {
    throw new Error("Invalid Request!");
  }

  try {
    _LANGUAGE.init(language);
    res.send(`Language changed to ${_LANGUAGE.getLanguage()}`);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while changing the language",
    });
  }
});
// #endregion

// #endregion

module.exports = router;
