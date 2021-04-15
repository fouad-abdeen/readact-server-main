const _BLC = require("../../BLC/BLC");

const routes = require("../Routes");

const { createUser, getAllUsers, getUser, editUser, deleteUser } = routes.user;

const express = require("express");
const router = express.Router();

const get_all_users = async (req, res) => {
  try {
    const oBLC = new _BLC();
    const users = await oBLC.get_all_users(req);
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving Users",
    });
  }
};

const get_user = (req, res) => {
  try {
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

router.get("/" + getAllUsers, get_all_users);
router.get("/" + getUser, get_user);
router.post("/" + createUser, create_user);

module.exports = router;
