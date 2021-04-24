/* eslint-disable camelcase */

const express = require("express");

const router = express.Router();

// Names of Routes
const routes = require("../Names.Routes");

const {
  authenticate,
  createUser,
  deleteUser,
  getAllUsers,
  getSomeUsers,
  getUsersByLocation,
  getUser,
  editUser,
  changePassword,
  requestVerificationCode,
  verifyAccount,
  getUserTypes,
  changeUserType,
  changeLocation,
} = routes.user;
const {
  //  getAllLocations,
  createLocation,
  //  editLocation,
  //  deleteLocation,
} = routes.location;

// JWT Authorization Middleware
const jwtAuth = require("../Middlewares/Auth");

// Business Logic Component
const BLC = require("../../BLC/BLC");

// Language for Messages
const LANGUAGE = require("../../Messages/Language");

// Custom Code Generator
const GENERATE_CODE = require("../../customCodeGenerator");

// #region Controllers

// #region User
const get_all_user_types = async (req, res) => {
  try {
    const oBLC = new BLC();
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
    const oBLC = new BLC();
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
    const oBLC = new BLC();
    const userStatus = await oBLC.create_user(req);
    res.send(userStatus);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while creating the User account",
    });
  }
};

const delete_user = async (req, res) => {
  try {
    const oBLC = new BLC();
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
    const oBLC = new BLC();
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
    const oBLC = new BLC();
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

const authenticate_user = async (req, res) => {
  try {
    const oBLC = new BLC();
    const user = await oBLC.authenticate_user(req);
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while logging in",
    });
  }
};

const get_all_users = async (req, res) => {
  try {
    const oBLC = new BLC();
    const users = await oBLC.get_all_users();
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving Users",
    });
  }
};

const get_users_by_location = async (req, res) => {
  try {
    const oBLC = new BLC();
    const users = await oBLC.get_users_by_location(req);
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving Users",
    });
  }
};

const get_user = async (req, res) => {
  try {
    const oBLC = new BLC();
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
    const oBLC = new BLC();
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
    const oBLC = new BLC();
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
    const oBLC = new BLC();
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

const verify_account = async (req, res) => {
  try {
    const oBLC = new BLC();
    const verification_status = await oBLC.verify_account(req);
    res.send(verification_status);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while verifiying your account",
    });
  }
};
// #endregion

// #region Location
const create_location = async (req, res) => {
  try {
    const oBLC = new BLC();
    const location_status = await oBLC.create_location(req);
    res.send(location_status);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        error.message || "Some error occured while creating the new location",
    });
  }
};

// #endregion

// #endregion

// #region Routes

// #region User
router.get(`/${authenticate}`, authenticate_user);
router.get(`/${getAllUsers}`, jwtAuth, get_all_users);
router.get(`/${getSomeUsers}`, jwtAuth, get_some_users);
router.get(`/${getUsersByLocation}`, jwtAuth, get_users_by_location);
router.get(`/${getUser}`, jwtAuth, get_user);
router.post(`/${createUser}`, jwtAuth, create_user);
router.put(`/${editUser}`, jwtAuth, edit_user);
router.delete(`/${deleteUser}`, jwtAuth, delete_user);
router.put(`/${changePassword}`, jwtAuth, change_password);
router.post(`/${requestVerificationCode}`, jwtAuth, request_verification_code);
router.put(`/${verifyAccount}`, jwtAuth, verify_account);
router.get(`/${getUserTypes}`, jwtAuth, get_all_user_types);
router.put(`/${changeUserType}`, jwtAuth, change_user_type);
router.put(`/${changeLocation}`, jwtAuth, change_location);
// #endregion

// #region Location
router.post(`/${createLocation}`, jwtAuth, create_location);
// #endregion

// #region Change Language
router.post(`/${routes.changeLanguage}`, (req, res) => {
  const { language } = req.body;

  if (language !== "EN" && language !== "AR") {
    throw new Error("Invalid Request!");
  }

  try {
    LANGUAGE.init(language);
    res.send(`Language changed to ${LANGUAGE.getLanguage()}`);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while changing the language",
    });
  }
});
// #endregion

// #region Generate Custom Code
router.get(`/${routes.generateCode}`, (req, res) => {
  const { first_name, last_name } = req.body;
  const code = GENERATE_CODE(first_name, last_name);

  try {
    res.send(code);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while generating the code",
    });
  }
});
// #endregion

// #endregion

module.exports = router;
