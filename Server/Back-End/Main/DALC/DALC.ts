export {};
// Mongoose Models
const UserModel = require("../Models/User");

// Messages
const _MESSAGES = require("../Messages/Messages");
const _LANGUAGE = require("../Messages/Language");

class DALC {
  // #region User
  get_users = async () => {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (error) {
      return error.message;
    }
  };

  get_user = async (user_id) => {
    try {
      const user = await UserModel.findOne({ _id: user_id });
      return user;
    } catch (error) {
      return error.message;
    }
  };

  create_user = async (user) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      const userDoc = new UserModel(user);
      await userDoc.save();
      return USER.SUCCESSFULL_CREATION;
    } catch (error) {
      return error.message;
    }
  };

  edit_user = async (user_id, user) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      UserModel.findByIdAndUpdate(
        { _id: user_id },
        user,
        {
          new: true,
        },
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      return USER.SUCCESSFULL_UPDATE;
    } catch (error) {
      return error.message;
    }
  };

  delete_user = async (user_id) => {
    const LAN = _LANGUAGE.getLanguage();
    let USER;

    if (LAN === "AR") {
      USER = _MESSAGES.AR.USER;
    } else {
      USER = _MESSAGES.EN.USER;
    }

    try {
      const user = await UserModel.findOneAndRemove({ _id: user_id });
      return `${user.username}${USER.SUCCESSFULL_DELETETION}`;
    } catch (error) {
      return error.message;
    }
  };
  // #endregion
}

module.exports = DALC;
