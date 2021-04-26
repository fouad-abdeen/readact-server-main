const express = require("express");

const router = express.Router();

// Names of Routes
const routes = require("../Names.Routes");

const {
  AUTHENTICATE,
  CREATE_USER,
  DELETE_USER,
  GET_ALL_USERS,
  GET_SOME_USERS,
  GET_USERS_BY_LOCATION,
  GET_USER,
  EDIT_USER,
  CHANGE_PASSWORD,
  REQUEST_VERIFICATION_CODE,
  VERIFY_ACCOUNT,
  GET_USERS_TYPES,
  CHANGE_USER_TYPE,
  CHANGE_LOCATION,
} = routes.user;
const {
  GET_ALL_LOCATIONS,
  CREATE_LOCATION,
  EDIT_LOCATION,
  DELETE_LOCATION,
} = routes.location;

// JWT Authorization Middleware
const jwtAuth = require("../Middlewares/Auth");

// Business Logic Component
const BLC = require("../../BLC/BLC");

// Custom Code Generator
const GENERATE_CODE = require("../../customCodeGenerator");

// #region Controllers

// #region User
const getAllUsersTypes = async (req, res) => {
  try {
    const oBLC = new BLC();
    const userTypes = await oBLC.getAllUsersTypes();
    res.send(userTypes);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occured while retrieving User account's types",
    });
  }
};

// #region Admin Privileges
const getSomeUsers = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const users = await oBLC.getSomeUsers(req);
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving Users",
    });
  }
};

const createUser = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const userStatus = await oBLC.createUser(req);
    res.send(userStatus);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while creating the User account",
    });
  }
};

const deleteUser = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const userStatus = await oBLC.deleteUser(req);
    res.send(userStatus);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while deleting the User account",
    });
  }
};

const changeUserType = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const status = await oBLC.changeUserType(req);
    res.send(status);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occured while changing User account's type",
    });
  }
};

const changeLocation = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const status = await oBLC.changeLocation(req);
    res.send(status);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while changing User's location",
    });
  }
};
// #endregion

const authenticateUser = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const user = await oBLC.authenticateUser(req);
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while logging in",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const oBLC = new BLC();
    const users = await oBLC.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving Users",
    });
  }
};

const getUsersByLocation = async (req, res) => {
  try {
    const oBLC = new BLC();
    const users = await oBLC.getUsersByLocation(req);
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving Users",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const oBLC = new BLC();
    const user = await oBLC.getUser(req);
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving your data",
    });
  }
};

const editUser = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const userStatus = await oBLC.editUser(req);
    res.send(userStatus);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while updating your data",
    });
  }
};

const changePassword = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const passwordStatus = await oBLC.changePassword(req);
    res.send(passwordStatus);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while changing your password",
    });
  }
};

const requestVerificationCode = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const requestStatus = await oBLC.requestVerificationCode(req);
    res.send(requestStatus);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occured while requesting your account verification code",
    });
  }
};

const verifyAccount = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const verificationStatus = await oBLC.verifyAccount(req);
    res.send(verificationStatus);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while verifiying your account",
    });
  }
};
// #endregion

// #region Location
const getAllLocations = async (req, res) => {
  try {
    const oBLC = new BLC();
    const locations = await oBLC.getAllLocations();
    res.send(locations);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving Locations",
    });
  }
};

const createLocation = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const locationStatus = await oBLC.createLocation(req);
    res.send(locationStatus);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while creating the new location",
    });
  }
};

const editLocation = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const locationStatus = await oBLC.editLocation(req);
    res.send(locationStatus);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while updating location's data",
    });
  }
};

const deleteLocation = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    await oBLC.setLanguage(language);
    const locationStatus = await oBLC.deleteLocation(req);
    res.send(locationStatus);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while deleting the location",
    });
  }
};
// #endregion

// #endregion

// #region Routes

// #region User
router.get(`/${AUTHENTICATE}`, authenticateUser);
router.get(`/${GET_ALL_USERS}`, jwtAuth, getAllUsers);
router.get(`/${GET_SOME_USERS}`, jwtAuth, getSomeUsers);
router.get(`/${GET_USERS_BY_LOCATION}`, jwtAuth, getUsersByLocation);
router.get(`/${GET_USER}`, jwtAuth, getUser);
router.post(`/${CREATE_USER}`, jwtAuth, createUser);
router.put(`/${EDIT_USER}`, jwtAuth, editUser);
router.delete(`/${DELETE_USER}`, jwtAuth, deleteUser);
router.put(`/${CHANGE_PASSWORD}`, jwtAuth, changePassword);
router.post(`/${REQUEST_VERIFICATION_CODE}`, jwtAuth, requestVerificationCode);
router.put(`/${VERIFY_ACCOUNT}`, jwtAuth, verifyAccount);
router.get(`/${GET_USERS_TYPES}`, jwtAuth, getAllUsersTypes);
router.put(`/${CHANGE_USER_TYPE}`, jwtAuth, changeUserType);
router.put(`/${CHANGE_LOCATION}`, jwtAuth, changeLocation);
// #endregion

// #region Location
router.get(`/${GET_ALL_LOCATIONS}`, jwtAuth, getAllLocations);
router.post(`/${CREATE_LOCATION}`, jwtAuth, createLocation);
router.put(`/${EDIT_LOCATION}`, jwtAuth, editLocation);
router.delete(`/${DELETE_LOCATION}`, jwtAuth, deleteLocation);
// #endregion

// #region Generate Custom Code
router.get(`/${routes.GENERATE_CODE}`, (req, res) => {
  const { firstName, lastName } = req.body;
  const code = GENERATE_CODE(firstName, lastName);

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
