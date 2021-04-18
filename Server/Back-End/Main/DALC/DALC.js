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
// Mongoose Models
var UserModel = require("../Models/User");
var UserTypeModel = require("../Models/UserType");
var LocationModel = require("../Models/Location");
var VerificationCodeModel = require("../Models/AccountVerificationCode");
// Messages
var _MESSAGES = require("../Messages/Messages");
var _LANGUAGE = require("../Messages/Language");
var DALC = /** @class */ (function () {
    function DALC() {
        var _this = this;
        // #region User
        this.get_users = function () { return __awaiter(_this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel.find({})];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1.message];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.get_all_user_types = function () { return __awaiter(_this, void 0, void 0, function () {
            var user_types, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserTypeModel.find({})];
                    case 1:
                        user_types = _a.sent();
                        return [2 /*return*/, user_types];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2.message];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // #region Admin Privileges
        this.create_user = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, userDoc, error_3;
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
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        userDoc = new UserModel(user);
                        return [4 /*yield*/, userDoc.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, USER.SUCCESSFULL_CREATION];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3.message];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.delete_user = function (user_id) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, user, error_4;
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
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UserModel.findOneAndRemove({ _id: user_id })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, "" + user.username + USER.SUCCESSFULL_DELETETION];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, error_4.message];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.change_user_type = function (user_id, user_type) { return __awaiter(_this, void 0, void 0, function () {
            var UserType, LAN, USER, USER_TYPE_TITLE;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserTypeModel.findOne({
                            custom_id: user_type
                        }).exec()];
                    case 1:
                        UserType = _a.sent();
                        LAN = _LANGUAGE.getLanguage();
                        if (LAN === "AR") {
                            USER = _MESSAGES.AR.USER;
                            USER_TYPE_TITLE = UserType.title_ar;
                        }
                        else {
                            USER = _MESSAGES.EN.USER;
                            USER_TYPE_TITLE = UserType.title_en;
                        }
                        try {
                            UserModel.findByIdAndUpdate({ _id: user_id }, { user_type_id: user_type }, function (err) {
                                if (err) {
                                    throw new Error(err);
                                }
                            });
                            return [2 /*return*/, USER.SUCCESSFULL_USER_TYPE_CHANGE + USER_TYPE_TITLE];
                        }
                        catch (error) {
                            return [2 /*return*/, error.message];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.change_location = function (user_id, location) { return __awaiter(_this, void 0, void 0, function () {
            var Location, LAN, USER, LOCATION_TITLE;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, LocationModel.findById({ _id: location }).exec()];
                    case 1:
                        Location = _a.sent();
                        LAN = _LANGUAGE.getLanguage();
                        if (LAN === "AR") {
                            USER = _MESSAGES.AR.USER;
                            LOCATION_TITLE = Location.title_ar;
                        }
                        else {
                            USER = _MESSAGES.EN.USER;
                            LOCATION_TITLE = Location.title_en;
                        }
                        try {
                            UserModel.findByIdAndUpdate({ _id: user_id }, { location_id: location }, function (err) {
                                if (err) {
                                    throw new Error(err);
                                }
                            });
                            return [2 /*return*/, USER.SUCCESSFULL_LOCATION_CHANGE + LOCATION_TITLE];
                        }
                        catch (error) {
                            return [2 /*return*/, error.message];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        // #endregion
        this.get_user = function (user_id) { return __awaiter(_this, void 0, void 0, function () {
            var user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel.findOne({ _id: user_id })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, error_5.message];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.edit_user = function (user_id, user) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER;
            return __generator(this, function (_a) {
                LAN = _LANGUAGE.getLanguage();
                if (LAN === "AR") {
                    USER = _MESSAGES.AR.USER;
                }
                else {
                    USER = _MESSAGES.EN.USER;
                }
                try {
                    UserModel.findByIdAndUpdate({ _id: user_id }, user, {
                        "new": true
                    }, function (err) {
                        if (err) {
                            throw new Error(err);
                        }
                    });
                    return [2 /*return*/, USER.SUCCESSFULL_UPDATE];
                }
                catch (error) {
                    return [2 /*return*/, error.message];
                }
                return [2 /*return*/];
            });
        }); };
        this.change_password = function (user_id, user) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER;
            return __generator(this, function (_a) {
                LAN = _LANGUAGE.getLanguage();
                if (LAN === "AR") {
                    USER = _MESSAGES.AR.USER;
                }
                else {
                    USER = _MESSAGES.EN.USER;
                }
                try {
                    UserModel.findByIdAndUpdate({ _id: user_id }, user, function (err) {
                        if (err) {
                            throw new Error(err);
                        }
                    });
                    return [2 /*return*/, USER.SUCCESSFULL_PASSWORD_CHANGE];
                }
                catch (error) {
                    return [2 /*return*/, error.message];
                }
                return [2 /*return*/];
            });
        }); };
        this.request_verification_code = function (user_id, email_address, code, request_date) { return __awaiter(_this, void 0, void 0, function () {
            var LAN, USER, VerficationCodeDoc, error_6;
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
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        VerficationCodeDoc = new VerificationCodeModel({
                            user_id: user_id,
                            email_address: email_address,
                            code: code,
                            request_date: request_date
                        });
                        return [4 /*yield*/, VerficationCodeDoc.save()];
                    case 2:
                        _a.sent();
                        UserModel.findByIdAndUpdate({ _id: user_id }, { is_verification_requested: true }, function (err) {
                            if (err) {
                                throw new Error(err);
                            }
                        });
                        return [2 /*return*/, USER.SUCCESSFULL_VERIF_CODE_REQUEST];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, error_6.message];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        // #endregion
    }
    return DALC;
}());
module.exports = DALC;
