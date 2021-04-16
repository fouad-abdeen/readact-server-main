const express = require("express");
const router = express.Router();

// Names of Routes
const routes = require("../Routes");
const {
  createUser,
  getAllUsers,
  getSomeUsers,
  getUser,
  editUser,
  deleteUser,
} = routes.user;

// Business Logic Component
const _BLC = require("../../BLC/BLC");

// Language for Business Rules' Messages
const _LANGUAGE = require("../../Messages/Language");

// #region Functions

// #region User
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

const get_user = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const user = await oBLC.get_user(req);
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving the User",
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
      message: error.message || "Some error occured while creating the User",
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

const delete_user = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const user_status = await oBLC.delete_user(req);
    res.send(user_status);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occured while deleting User account",
    });
  }
};
// #endregion

// #endregion

// #region HTTP Methods

// #region User
router.get("/" + getAllUsers, get_all_users);
router.get("/" + getSomeUsers, get_some_users);
router.get("/" + getUser, get_user);
router.post("/" + createUser, create_user);
router.put("/" + editUser, edit_user);
router.delete("/" + deleteUser, delete_user);
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
