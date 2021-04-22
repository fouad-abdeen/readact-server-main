const routes = {
  user: {
    authenticate: "authenticate",
    createUser: "createUser",
    getAllUsers: "getAllUsers",
    getSomeUsers: "getSomeUsers",
    getUser: "getUserById",
    editUser: "editUser",
    deleteUser: "deleteUser",
    changePassword: "changePassword",
    requestVerificationCode: "requestVerificationCode",
    verifyAccount: "verifyAccount",
    getUserTypes: "getAllUserTypes",
    changeUserType: "changeUserType",
    changeLocation: "changeLocation",
  },
  changeLanguage: "changeLanguage",
  generateCode: "generateCode",
};

module.exports = routes;
