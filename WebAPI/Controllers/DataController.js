const express = require("express");

const router = express.Router();

// #region Names of Routes
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
  REQUEST_VERIFICATION,
  VERIFY_ACCOUNT,
  REQUEST_PASSWORD_RESET,
  RESET_PASSWORD,
  GET_USERS_TYPES,
  CHANGE_USER_TYPE,
  CHANGE_LOCATION,
} = routes.user;
const { GET_ALL_LOCATIONS, CREATE_LOCATION, EDIT_LOCATION, DELETE_LOCATION } =
  routes.location;
// #endregion

// JWT Authorization Middleware
const jwtAuth = require("../Middlewares/Auth");

// Business Logic Component
const BLC = require("../../BLC/BLC");

// Messages
const { FAILURE, SUCCESS } = require("../../Messages/Messages");

// #region Helpers
// Custom Code Generator
const GENERATE_CODE = require("../../Helpers/customCodeGenerator");

// Language String Formatter
const FORMAT_LANG = require("../../Helpers/langStringFormatter");
// #endregion

// #region Controllers

// #region User
const getAllUsersTypes = async (req, res) => {
  try {
    const oBLC = new BLC();
    const userTypes = await oBLC.getAllUsersTypes();
    res.send(userTypes);
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message ||
            "Some error occured while retrieving User account's types"
        )
      );
  }
};

// #region Admin Privileges
const getSomeUsers = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const users = await oBLC.getSomeUsers(req);
    res.send(users);
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(error.message || "Some error occured while retrieving Users")
      );
  }
};

const createUser = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const userStatus = await oBLC.createUser(req);
    res.send(SUCCESS(userStatus));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while creating the User account"
        )
      );
  }
};

const deleteUser = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const userStatus = await oBLC.deleteUser(req);
    res.send(SUCCESS(userStatus));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while deleting the User account"
        )
      );
  }
};

const changeUserType = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const status = await oBLC.changeUserType(req);
    res.send(SUCCESS(status));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message ||
            "Some error occured while changing User account's type"
        )
      );
  }
};

const changeLocation = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const status = await oBLC.changeLocation(req);
    res.send(SUCCESS(status));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while changing User's location"
        )
      );
  }
};
// #endregion

const authenticateUser = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const token = await oBLC.authenticateUser(req);
    res.send({ token });
  } catch (error) {
    res
      .status(500)
      .send(FAILURE(error.message || "Some error occured while logging in"));
  }
};

const getAllUsers = async (req, res) => {
  try {
    const oBLC = new BLC();
    const users = await oBLC.getAllUsers();
    res.send(users);
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(error.message || "Some error occured while retrieving Users")
      );
  }
};

const getUsersByLocation = async (req, res) => {
  try {
    const oBLC = new BLC();
    const users = await oBLC.getUsersByLocation(req);
    res.send(users);
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(error.message || "Some error occured while retrieving Users")
      );
  }
};

const getUser = async (req, res) => {
  try {
    const oBLC = new BLC();
    const user = await oBLC.getUser(req);
    res.send(user);
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while retrieving your data"
        )
      );
  }
};

const editUser = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const userStatus = await oBLC.editUser(req);
    res.send(SUCCESS(userStatus));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(error.message || "Some error occured while updating your data")
      );
  }
};

const changePassword = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const passwordStatus = await oBLC.changePassword(req);
    res.send(SUCCESS(passwordStatus));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while changing your password"
        )
      );
  }
};

const requestVerification = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const requestStatus = await oBLC.requestVerification(req);
    res.send(SUCCESS(requestStatus));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message ||
            "Some error occured while requesting your account verification URL"
        )
      );
  }
};

const verifyAccount = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const verificationStatus = await oBLC.verifyAccount(req);
    res.send(SUCCESS(verificationStatus));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while verifiying your account"
        )
      );
  }
};

const requestPasswordReset = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const requestStatus = await oBLC.requestPasswordReset(req);
    res.send(SUCCESS(requestStatus));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while requesting password reset"
        )
      );
  }
};

const resetPassword = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const verificationStatus = await oBLC.resetPassword(req);
    res.send(SUCCESS(verificationStatus));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while resetting your password"
        )
      );
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
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while retrieving Locations"
        )
      );
  }
};

const createLocation = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const locationStatus = await oBLC.createLocation(req);
    res.send(SUCCESS(locationStatus));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while creating the new location"
        )
      );
  }
};

const editLocation = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const locationStatus = await oBLC.editLocation(req);
    res.send(SUCCESS(locationStatus));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while updating location's data"
        )
      );
  }
};

const deleteLocation = async (req, res) => {
  const { language } = req.body;
  try {
    const oBLC = new BLC();
    if (language) oBLC.setLanguage(FORMAT_LANG(language));
    const locationStatus = await oBLC.deleteLocation(req);
    res.send(SUCCESS(locationStatus));
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(
          error.message || "Some error occured while deleting the location"
        )
      );
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
router.post(`/${REQUEST_VERIFICATION}`, jwtAuth, requestVerification);
router.put(`/${VERIFY_ACCOUNT}`, verifyAccount);
router.post(`/${REQUEST_PASSWORD_RESET}`, requestPasswordReset);
router.put(`/${RESET_PASSWORD}`, resetPassword);
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
    res.send({ code });
  } catch (error) {
    res
      .status(500)
      .send(
        FAILURE(error.message || "Some error occured while generating the code")
      );
  }
});
// #endregion

// #endregion

module.exports = router;
