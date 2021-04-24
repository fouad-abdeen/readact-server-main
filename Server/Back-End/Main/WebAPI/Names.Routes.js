const routes = {
  user: {
    authenticate: "authenticate",
    createUser: "createUser",
    deleteUser: "deleteUser",
    getAllUsers: "getAllUsers",
    getSomeUsers: "getSomeUsers",
    getUsersByLocation: "getUsersByLocationId",
    getUser: "getUserById",
    editUser: "editUser",
    changePassword: "changePassword",
    requestVerificationCode: "requestVerificationCode",
    verifyAccount: "verifyAccount",
    getUserTypes: "getAllUserTypes",
    changeUserType: "changeUserType",
    changeLocation: "changeLocation",
  },
  location: {
    getAllLocations: "getAllLocations",
    createLocation: "createLocation",
    editLocation: "editLocation",
    deleteLocation: "deleteLocation",
  },
  changeLanguage: "changeLanguage",
  generateCode: "generateCode",
};

module.exports = routes;
