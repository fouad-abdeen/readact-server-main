"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var validator = require("validator");
// Data Access Layer Component
var _DALC = require("../DALC/DALC");
// Business Rules' Messages
var _MESSAGES = require("../Messages/Messages");
var _LANGUAGE = require("../Messages/Language");
// User Types Ids
var _ID = require("./UserTypes");
// Mongoose Models
var UserModel = require("../Models/User");
var UserTypeModel = require("../Models/UserType");
var BLC = /** @class */ (function () {
    function BLC() {
        var _this = this;
        //  #region User
        this.get_all_user_types = function () { return __awaiter(_this, void 0, void 0, function () {
            var oDALC, user_types, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.get_all_user_types()];
                    case 1:
                        user_types = _a.sent();
                        return [2 /*return*/, user_types];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1.message];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // #region Admin Privileges
        this.get_some_users = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, user_id, oDALC, users, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LAN = _LANGUAGE.getLanguage();
                        if (LAN === "AR") {
                            USER = _MESSAGES.AR.USER;
                        }
                        else {
                            USER = _MESSAGES.EN.USER;
                        }
                        user_id = req.body.user_id;
                        if (user_id !== _ID.SuperAdmin && user_id !== _ID.Admin) {
                            throw new Error(USER.USERS_LIST);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.get_users()];
                    case 2:
                        users = _a.sent();
                        return [2 /*return*/, users.filter(function (user) { return user.user_type_id !== _ID.SuperAdmin; })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2.message];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.create_user = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, user, user_id, user_type_id, username, isStrongPassword, IDs, oDALC, status_1, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LAN = _LANGUAGE.getLanguage();
                        if (LAN === "AR") {
                            USER = _MESSAGES.AR.USER;
                        }
                        else {
                            USER = _MESSAGES.EN.USER;
                        }
                        user = req.body;
                        user_id = req.body.user_id;
                        user_type_id = req.body.user_type_id;
                        return [4 /*yield*/, UserModel.findOne({
                                username: user.username
                            }).exec()];
                    case 1:
                        username = _a.sent();
                        isStrongPassword = validator.isStrongPassword(user.password);
                        IDs = Object.values(_ID);
                        if (user_id !== _ID.SuperAdmin && user_id !== _ID.Admin) {
                            throw new Error(USER.USER_CREATION);
                        }
                        else if (user_type_id === _ID.SuperAdmin) {
                            throw new Error(USER.SA_CREATION);
                        }
                        else if (username !== null) {
                            throw new Error(USER.USERNAME);
                        }
                        else if (!isStrongPassword) {
                            throw new Error(USER.PASSWORD);
                        }
                        else if (IDs.indexOf(user_type_id) === -1) {
                            throw new Error(USER.USER_TYPE_ID);
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.create_user(user)];
                    case 3:
                        status_1 = _a.sent();
                        return [2 /*return*/, status_1];
                    case 4:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3.message];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.delete_user = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, user, oDALC, status_2, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LAN = _LANGUAGE.getLanguage();
                        if (LAN === "AR") {
                            USER = _MESSAGES.AR.USER;
                        }
                        else {
                            USER = _MESSAGES.EN.USER;
                        }
                        user = req.body;
                        if (user.user_id !== _ID.SuperAdmin) {
                            throw new Error(USER.USER_DELETION);
                        }
                        else if (user.user_type_id === _ID.SuperAdmin) {
                            throw new Error(USER.SA_DELETION);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.delete_user(user._id)];
                    case 2:
                        status_2 = _a.sent();
                        return [2 /*return*/, status_2];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, error_4.message];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.change_user_type = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, user, user_id, currentUser, current_user_type, new_user_type, IDs, oDALC, status_3, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LAN = _LANGUAGE.getLanguage();
                        if (LAN === "AR") {
                            USER = _MESSAGES.AR.USER;
                        }
                        else {
                            USER = _MESSAGES.EN.USER;
                        }
                        user = req.body;
                        user_id = user.user_id;
                        return [4 /*yield*/, UserModel.findById(user._id).exec()];
                    case 1:
                        currentUser = _a.sent();
                        current_user_type = currentUser.user_type_id;
                        new_user_type = user.user_type_id;
                        IDs = Object.values(_ID);
                        if (user_id !== _ID.SuperAdmin && user_id !== _ID.Admin) {
                            throw new Error(USER.USER_TYPE_CHANGE);
                        }
                        else if (user_id === 2 && current_user_type === _ID.Admin) {
                            throw new Error(USER.ADMIN_TYPE_CHANGE);
                        }
                        else if (user_id === 2 && new_user_type === _ID.Admin) {
                            throw new Error(USER.ADMIN_TYPE_ASSIGN);
                        }
                        else if (current_user_type === _ID.SuperAdmin) {
                            throw new Error(USER.SA_TYPE_CHANGE);
                        }
                        else if (new_user_type === _ID.SuperAdmin) {
                            throw new Error(USER.SA_TYPE_ASSIGN);
                        }
                        else if (IDs.indexOf(new_user_type) === -1) {
                            throw new Error(USER.USER_TYPE_ID);
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.change_user_type(user._id, new_user_type)];
                    case 3:
                        status_3 = _a.sent();
                        return [2 /*return*/, status_3];
                    case 4:
                        error_5 = _a.sent();
                        return [2 /*return*/, error_5.message];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.change_location = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, user, user_id, user_type_id, location_id, oDALC, status_4, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LAN = _LANGUAGE.getLanguage();
                        if (LAN === "AR") {
                            USER = _MESSAGES.AR.USER;
                        }
                        else {
                            USER = _MESSAGES.EN.USER;
                        }
                        user = req.body;
                        user_id = user.user_id;
                        user_type_id = user.user_type_id;
                        location_id = user.location_id;
                        if (user_id !== _ID.SuperAdmin && user_id !== _ID.Admin) {
                            throw new Error(USER.LOCATION_CHANGE);
                        }
                        else if (user_id === _ID.Admin && user_type_id === _ID.Admin) {
                            throw new Error(USER.ADMIN_LOCATION_CHANGE);
                        }
                        else if (user_type_id === _ID.SuperAdmin) {
                            throw new Error(USER.SA_LOCATION_CHANGE);
                        }
                        return [4 /*yield*/, UserModel.findById(user._id).exec()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.change_location(user._id, location_id)];
                    case 3:
                        status_4 = _a.sent();
                        return [2 /*return*/, status_4];
                    case 4:
                        error_6 = _a.sent();
                        return [2 /*return*/, error_6.message];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        // #endregion
        this.get_all_users = function () { return __awaiter(_this, void 0, void 0, function () {
            var oDALC, users, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.get_users()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, error_7.message];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.get_user = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, oDALC, user, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.body._id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.get_user(user_id)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 3:
                        error_8 = _a.sent();
                        return [2 /*return*/, error_8.message];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.edit_user = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, currentUser, user_id, user, isValidEmail, isValidMobileNumber, firstNameEn, firstNameAr, lastNameEn, lastNameAr, oDALC, status_5, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LAN = _LANGUAGE.getLanguage();
                        if (LAN === "AR") {
                            USER = _MESSAGES.AR.USER;
                        }
                        else {
                            USER = _MESSAGES.EN.USER;
                        }
                        currentUser = req.body;
                        user_id = currentUser._id;
                        return [4 /*yield*/, UserModel.findOne({
                                username: currentUser.username
                            }).exec()];
                    case 1:
                        user = _a.sent();
                        isValidEmail = validator.isEmail(currentUser.email_address);
                        isValidMobileNumber = validator.isMobilePhone(currentUser.mobile_number);
                        firstNameEn = currentUser.first_name_en;
                        firstNameAr = currentUser.first_name_ar;
                        lastNameEn = currentUser.last_name_en;
                        lastNameAr = currentUser.last_name_ar;
                        return [4 /*yield*/, UserModel.findById(user_id).exec()];
                    case 2:
                        _a.sent();
                        if (user !== null && user._id.toString() !== currentUser._id) {
                            throw new Error(USER.USERNAME);
                        }
                        else if (!isValidEmail) {
                            throw new Error(USER.EMAIL);
                        }
                        else if (!isValidMobileNumber) {
                            throw new Error(USER.MOBILE);
                        }
                        else if (firstNameEn.length < 2 || firstNameAr.length < 2) {
                            throw new Error(USER.FIRST_NAME);
                        }
                        else if (lastNameEn.length < 2 || lastNameAr.length < 2) {
                            throw new Error(USER.LAST_NAME);
                        }
                        else if (typeof currentUser.full_address_en !== "string" ||
                            typeof currentUser.full_address_ar !== "string") {
                            throw new Error(USER.ADDRESS);
                        }
                        else {
                            delete currentUser["_id"];
                            delete currentUser["password"];
                            delete currentUser["user_type_id"];
                            delete currentUser["location_id"];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.edit_user(user_id, currentUser)];
                    case 4:
                        status_5 = _a.sent();
                        return [2 /*return*/, status_5];
                    case 5:
                        error_9 = _a.sent();
                        return [2 /*return*/, error_9.message];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.change_password = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, currentUser, user_id, user, isStrongPassword, oDALC, status_6, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LAN = _LANGUAGE.getLanguage();
                        if (LAN === "AR") {
                            USER = _MESSAGES.AR.USER;
                        }
                        else {
                            USER = _MESSAGES.EN.USER;
                        }
                        currentUser = req.body;
                        user_id = currentUser._id;
                        return [4 /*yield*/, UserModel.findById(user_id).exec()];
                    case 1:
                        user = _a.sent();
                        isStrongPassword = validator.isStrongPassword(currentUser.password);
                        if (currentUser.password_check !== user.password) {
                            throw new Error(USER.PASSWORD_CHECK);
                        }
                        else if (currentUser.password !== currentUser.password_confirmation) {
                            throw new Error(USER.PASSWORD_CONFIRMATION);
                        }
                        else if (currentUser.password_check === currentUser.password) {
                            throw new Error(USER.PASSWORD_UNCHANGED);
                        }
                        else if (!isStrongPassword) {
                            throw new Error(USER.PASSWORD);
                        }
                        else {
                            delete currentUser["_id"];
                            delete currentUser["password_check"];
                            delete currentUser["password_confirmation"];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.change_password(user_id, currentUser)];
                    case 3:
                        status_6 = _a.sent();
                        return [2 /*return*/, status_6];
                    case 4:
                        error_10 = _a.sent();
                        return [2 /*return*/, error_10.message];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        //  #endregion
    }
    return BLC;
}());
module.exports = BLC;
