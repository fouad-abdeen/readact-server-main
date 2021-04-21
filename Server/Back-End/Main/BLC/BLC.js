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
var moment = require("moment");
// Data Access Layer Component
var _DALC = require("../DALC/DALC");
// Business Rules' Messages
var _MESSAGES = require("../Messages/Messages");
var _LANGUAGE = require("../Messages/Language");
// Code Generator for Account Verification & Password Reset
var _CODE_GENERATOR = require("./CodeGenerator");
// User Types Ids
var _ID = require("./UserTypes");
// Mongoose Models
var UserModel = require("../Models/User");
var VerificationCodeModel = require("../Models/AccountVerificationCode");
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
            var LAN, USER, user, password, user_id, user_type_id, username, isStrongPassword, IDs, oDALC, status_1, error_3;
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
                        password = user.password;
                        user_id = req.body.user_id;
                        user_type_id = req.body.user_type_id;
                        return [4 /*yield*/, UserModel.findOne({
                                username: user.username
                            }).exec()];
                    case 1:
                        username = _a.sent();
                        isStrongPassword = validator.isStrongPassword(password);
                        IDs = Object.values(_ID);
                        if (user_id !== _ID.SuperAdmin && user_id !== _ID.Admin) {
                            throw new Error(USER.USER_CREATION);
                        }
                        else if (user_type_id === _ID.SuperAdmin) {
                            throw new Error(USER.SA_CREATION);
                        }
                        else if (username) {
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
                        return [4 /*yield*/, oDALC.create_user(user, password)];
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
            var LAN, USER, user, user_id, new_user_type, IDs, user_data, current_user_type, oDALC, status_3, error_5;
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
                        new_user_type = user.user_type_id;
                        IDs = Object.values(_ID);
                        if (!(user_id !== _ID.SuperAdmin && user_id !== _ID.Admin)) return [3 /*break*/, 1];
                        throw new Error(USER.USER_TYPE_CHANGE);
                    case 1:
                        if (!(user_id === 2 && new_user_type === _ID.Admin)) return [3 /*break*/, 2];
                        throw new Error(USER.ADMIN_TYPE_ASSIGN);
                    case 2:
                        if (!(new_user_type === _ID.SuperAdmin)) return [3 /*break*/, 3];
                        throw new Error(USER.SA_TYPE_ASSIGN);
                    case 3:
                        if (!(IDs.indexOf(new_user_type) === -1)) return [3 /*break*/, 4];
                        throw new Error(USER.USER_TYPE_ID);
                    case 4: return [4 /*yield*/, UserModel.findById(user._id).exec()];
                    case 5:
                        user_data = _a.sent();
                        if (user_data == null) {
                            throw new Error(USER.INEXISTENT_USER);
                        }
                        else {
                            current_user_type = user_data.user_type_id;
                            if (user_id === 2 && current_user_type === _ID.Admin) {
                                throw new Error(USER.ADMIN_TYPE_CHANGE);
                            }
                            else if (current_user_type === _ID.SuperAdmin) {
                                throw new Error(USER.SA_TYPE_CHANGE);
                            }
                            else if (current_user_type === new_user_type) {
                                throw new Error(USER.UNCHANGED_USER_TYPE);
                            }
                        }
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.change_user_type(user._id, new_user_type)];
                    case 7:
                        status_3 = _a.sent();
                        return [2 /*return*/, status_3];
                    case 8:
                        error_5 = _a.sent();
                        return [2 /*return*/, error_5.message];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.change_location = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, user, user_id, user_type_id, location_id, user_data, oDALC, status_4, error_6;
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
                        if (!(user_id !== _ID.SuperAdmin && user_id !== _ID.Admin)) return [3 /*break*/, 1];
                        throw new Error(USER.LOCATION_CHANGE);
                    case 1:
                        if (!(user_id === _ID.Admin && user_type_id === _ID.Admin)) return [3 /*break*/, 2];
                        throw new Error(USER.ADMIN_LOCATION_CHANGE);
                    case 2:
                        if (!(user_type_id === _ID.SuperAdmin)) return [3 /*break*/, 3];
                        throw new Error(USER.SA_LOCATION_CHANGE);
                    case 3: return [4 /*yield*/, UserModel.findById(user._id).exec()];
                    case 4:
                        user_data = _a.sent();
                        if (user_data == null) {
                            throw new Error(USER.INEXISTENT_USER);
                        }
                        else {
                            if (location_id === user_data.location_id.toString()) {
                                throw new Error(USER.UNCHANGED_LOCATION);
                            }
                        }
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.change_location(user._id, location_id)];
                    case 6:
                        status_4 = _a.sent();
                        return [2 /*return*/, status_4];
                    case 7:
                        error_6 = _a.sent();
                        return [2 /*return*/, error_6.message];
                    case 8: return [2 /*return*/];
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
            var LAN, USER, currentUser, _id, username, email_address, first_name_en, first_name_ar, last_name_en, last_name_ar, full_address_en, full_address_ar, isValidEmail, isValidMobileNumber, userByUsername, userByEmail, userByID, user_type_id, oDALC, status_5, error_9;
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
                        _id = currentUser._id, username = currentUser.username, email_address = currentUser.email_address, first_name_en = currentUser.first_name_en, first_name_ar = currentUser.first_name_ar, last_name_en = currentUser.last_name_en, last_name_ar = currentUser.last_name_ar, full_address_en = currentUser.full_address_en, full_address_ar = currentUser.full_address_ar;
                        isValidEmail = validator.isEmail(email_address);
                        isValidMobileNumber = validator.isMobilePhone(currentUser.mobile_number);
                        if (!!isValidEmail) return [3 /*break*/, 1];
                        throw new Error(USER.EMAIL);
                    case 1:
                        if (!!isValidMobileNumber) return [3 /*break*/, 2];
                        throw new Error(USER.MOBILE);
                    case 2:
                        if (!(typeof first_name_en !== "string" ||
                            typeof first_name_ar !== "string")) return [3 /*break*/, 3];
                        throw new Error(USER.FIRST_NAME);
                    case 3:
                        if (!(typeof last_name_en !== "string" ||
                            typeof last_name_ar !== "string")) return [3 /*break*/, 4];
                        throw new Error(USER.LAST_NAME);
                    case 4:
                        if (!(first_name_en.length < 2 || first_name_ar.length < 2)) return [3 /*break*/, 5];
                        throw new Error(USER.FIRST_NAME);
                    case 5:
                        if (!(last_name_en.length < 2 || last_name_ar.length < 2)) return [3 /*break*/, 6];
                        throw new Error(USER.LAST_NAME);
                    case 6:
                        if (!(username.length < 4)) return [3 /*break*/, 7];
                        throw new Error(USER.INVALID_USERNAME);
                    case 7:
                        if (!(typeof full_address_en !== "string" ||
                            typeof full_address_ar !== "string")) return [3 /*break*/, 8];
                        throw new Error(USER.ADDRESS);
                    case 8:
                        if (!(full_address_en.length < 20 || full_address_ar.length < 20)) return [3 /*break*/, 9];
                        throw new Error(USER.ADDRESS_LENGTH);
                    case 9:
                        if (!(email_address !== currentUser.email_address_confirmation)) return [3 /*break*/, 10];
                        throw new Error(USER.EMAIL_CONFIRMATION);
                    case 10: return [4 /*yield*/, UserModel.findOne({
                            username: username
                        }).exec()];
                    case 11:
                        userByUsername = _a.sent();
                        if (!(userByUsername &&
                            userByUsername._id.toString() !== currentUser._id &&
                            currentUser._id)) return [3 /*break*/, 12];
                        throw new Error(USER.USERNAME);
                    case 12: return [4 /*yield*/, UserModel.findOne({
                            email_address: email_address
                        }).exec()];
                    case 13:
                        userByEmail = _a.sent();
                        if (!(userByEmail &&
                            userByEmail._id.toString() !== currentUser._id &&
                            currentUser._id)) return [3 /*break*/, 14];
                        throw new Error(USER.EMAIL_EXISTS);
                    case 14: return [4 /*yield*/, UserModel.findById(_id).exec()];
                    case 15:
                        userByID = _a.sent();
                        user_type_id = userByID.user_type_id;
                        if (user_type_id !== _ID.SuperAdmin && user_type_id !== _ID.Admin) {
                            delete currentUser["_id"];
                            delete currentUser["password"];
                            delete currentUser["is_verified"];
                            delete currentUser["is_verification_requested"];
                            delete currentUser["email_address_confirmation"];
                            delete currentUser["user_type_id"];
                            delete currentUser["location_id"];
                        }
                        else {
                            delete currentUser["_id"];
                            delete currentUser["password"];
                            delete currentUser["is_verified"];
                            delete currentUser["is_verification_requested"];
                            delete currentUser["email_address_confirmation"];
                            delete currentUser["user_type_id"];
                        }
                        _a.label = 16;
                    case 16:
                        currentUser["is_profile_completed"] = true;
                        _a.label = 17;
                    case 17:
                        _a.trys.push([17, 19, , 20]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.edit_user(_id, currentUser)];
                    case 18:
                        status_5 = _a.sent();
                        return [2 /*return*/, status_5];
                    case 19:
                        error_9 = _a.sent();
                        return [2 /*return*/, error_9.message];
                    case 20: return [2 /*return*/];
                }
            });
        }); };
        this.change_password = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, currentUser, user_id, oldPassword, newPassword, user, isValidPassword, isStrongPassword, oDALC, status_6, error_10;
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
                        oldPassword = currentUser.password_check;
                        newPassword = currentUser.password;
                        return [4 /*yield*/, UserModel.findById(user_id).exec()];
                    case 1:
                        user = _a.sent();
                        isValidPassword = user.validPassword(oldPassword);
                        isStrongPassword = validator.isStrongPassword(newPassword);
                        if (!isValidPassword) {
                            throw new Error(USER.PASSWORD_CHECK);
                        }
                        else if (newPassword !== currentUser.password_confirmation) {
                            throw new Error(USER.PASSWORD_CONFIRMATION);
                        }
                        else if (oldPassword === newPassword) {
                            throw new Error(USER.PASSWORD_UNCHANGED);
                        }
                        else if (!isStrongPassword) {
                            throw new Error(USER.PASSWORD);
                        }
                        else {
                            delete currentUser["_id"];
                            delete currentUser["password_check"];
                            delete currentUser["password"];
                            delete currentUser["password_confirmation"];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.change_password(user_id, newPassword)];
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
        this.request_verification_code = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, user, user_id, user_data, isVerified, isVerificationRequested, isProfileCompleted, verificationRequest, code, date, oDALC, status_7, error_11;
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
                        user_id = user._id;
                        return [4 /*yield*/, UserModel.findById(user_id).exec()];
                    case 1:
                        user_data = _a.sent();
                        isVerified = user_data.is_verified;
                        isVerificationRequested = user_data.is_verification_requested;
                        isProfileCompleted = user_data.is_profile_completed;
                        if (!!isProfileCompleted) return [3 /*break*/, 2];
                        throw new Error(USER.ICOMPLETE_PROFILE);
                    case 2:
                        if (!(isVerificationRequested && !isVerified)) return [3 /*break*/, 3];
                        throw new Error(USER.REQUESTED_VERIFICATION);
                    case 3:
                        if (!isVerified) return [3 /*break*/, 4];
                        throw new Error(USER.VERIFIED_ACCOUNT);
                    case 4: return [4 /*yield*/, VerificationCodeModel.findOne({
                            user_id: user_id
                        }).exec()];
                    case 5:
                        verificationRequest = _a.sent();
                        if (verificationRequest) {
                            throw new Error(USER.REQUESTED_VERIFICATION);
                        }
                        _a.label = 6;
                    case 6: return [4 /*yield*/, _CODE_GENERATOR(user.first_name_en, user.last_name_en)];
                    case 7:
                        code = _a.sent();
                        date = moment();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.request_verification_code(user_id, user.email_address, code, date)];
                    case 9:
                        status_7 = _a.sent();
                        // Send verification code by email
                        return [2 /*return*/, status_7];
                    case 10:
                        error_11 = _a.sent();
                        return [2 /*return*/, error_11.message];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        this.verify_account = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, user, user_id, verfication_request, code, isExpired, date, now, difference, user_data, isVerified, oDALC, status_8, error_12;
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
                        user_id = user._id;
                        return [4 /*yield*/, VerificationCodeModel.findOne({
                                user_id: user_id
                            }).exec()];
                    case 1:
                        verfication_request = _a.sent();
                        if (!!verfication_request) return [3 /*break*/, 2];
                        throw new Error(USER.INEXISTENT_VERIFICATION_CODE);
                    case 2:
                        code = verfication_request.code;
                        isExpired = verfication_request.is_expired;
                        date = verfication_request.request_date;
                        if (!(code !== user.code)) return [3 /*break*/, 3];
                        throw new Error(USER.VERIFICATION_CODE);
                    case 3:
                        if (!isExpired) return [3 /*break*/, 4];
                        throw new Error(USER.EXPIRED_VERIFICATION_CODE);
                    case 4:
                        now = moment();
                        difference = now.diff(date, "hours");
                        if (!(difference > 48)) return [3 /*break*/, 6];
                        return [4 /*yield*/, VerificationCodeModel.findOneAndUpdate({ code: code }, { is_expired: true })];
                    case 5:
                        _a.sent();
                        throw new Error(USER.EXPIRED_VERIFICATION_CODE);
                    case 6: return [4 /*yield*/, UserModel.findById(user_id).exec()];
                    case 7:
                        user_data = _a.sent();
                        isVerified = user_data.is_verified;
                        if (isVerified) {
                            throw new Error(USER.VERIFIED_ACCOUNT);
                        }
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        oDALC = new _DALC();
                        return [4 /*yield*/, oDALC.verify_account(user_id)];
                    case 9:
                        status_8 = _a.sent();
                        return [2 /*return*/, status_8];
                    case 10:
                        error_12 = _a.sent();
                        return [2 /*return*/, error_12.message];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        //  #endregion
    }
    return BLC;
}());
module.exports = BLC;
