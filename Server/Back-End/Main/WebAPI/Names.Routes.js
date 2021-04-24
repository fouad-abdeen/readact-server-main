const routes = {
  user: {
    AUTHENTICATE: "authenticate",
    CREATE_USER: "createUser",
    DELETE_USER: "deleteUser",
    GET_ALL_USERS: "getAllUsers",
    GET_SOME_USERS: "getSomeUsers",
    GET_USERS_BY_LOCATION: "getUsersByLocationId",
    GET_USER: "getUserById",
    EDIT_USER: "editUser",
    CHANGE_PASSWORD: "changePassword",
    REQUEST_VERIFICATION_CODE: "requestVerificationCode",
    VERIFY_ACCOUNT: "verifyAccount",
    GET_USERS_TYPES: "getAllUserTypes",
    CHANGE_USER_TYPE: "changeUserType",
    CHANGE_LOCATION: "changeLocation",
  },
  location: {
    GET_ALL_LOCATIONS: "getAllLocations",
    CREATE_LOCATION: "createLocation",
    EDIT_LOCATION: "editLocation",
    DELETE_LOCATION: "deleteLocation",
  },
  GENERATE_CODE: "generateCode",
};

module.exports = routes;
