const UserModel = require("../Models/User");

class DALC {
  create_user = async (req) => {
    const user = req.body;

    try {
      const userDoc = new UserModel(user);
      await userDoc.save();
      return "User created successfully";
    } catch (error) {
      return error.message;
    }
  };
}

module.exports = DALC;
