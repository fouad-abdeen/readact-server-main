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
var _this = this;
var express = require("express");
var router = express.Router();
// Names of Routes
var routes = require("../Names.Routes");
var _a = routes.user, createUser = _a.createUser, getAllUsers = _a.getAllUsers, getSomeUsers = _a.getSomeUsers, getUser = _a.getUser, editUser = _a.editUser, deleteUser = _a.deleteUser, changePassword = _a.changePassword, getUserTypes = _a.getUserTypes, changeUserType = _a.changeUserType, changeLocation = _a.changeLocation, requestVerificationCode = _a.requestVerificationCode, verifyAccount = _a.verifyAccount;
// Business Logic Component
var _BLC = require("../../BLC/BLC");
// Language for Messages
var _LANGUAGE = require("../../Messages/Language");
// #region Controllers
// #region User
var get_all_user_types = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, user_types, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.get_all_user_types()];
            case 1:
                user_types = _a.sent();
                res.send(user_types);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).send({
                    message: error_1.message ||
                        "Some error occured while retrieving User account's types"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// #region Admin Privileges
var get_some_users = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.get_some_users(req)];
            case 1:
                users = _a.sent();
                res.send(users);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).send({
                    message: error_2.message || "Some error occured while retrieving Users"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create_user = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, user_status, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.create_user(req)];
            case 1:
                user_status = _a.sent();
                res.send(user_status);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).send({
                    message: error_3.message || "Some error occured while creating the User account"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var delete_user = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, user_status, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.delete_user(req)];
            case 1:
                user_status = _a.sent();
                res.send(user_status);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).send({
                    message: error_4.message || "Some error occured while deleting the User account"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var change_user_type = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, status_1, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.change_user_type(req)];
            case 1:
                status_1 = _a.sent();
                res.send(status_1);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).send({
                    message: error_5.message ||
                        "Some error occured while changing User account's type"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var change_location = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, status_2, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.change_location(req)];
            case 1:
                status_2 = _a.sent();
                res.send(status_2);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).send({
                    message: error_6.message || "Some error occured while changing User's location"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// #endregion
var get_all_users = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, users, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.get_all_users()];
            case 1:
                users = _a.sent();
                res.send(users);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.status(500).send({
                    message: error_7.message || "Some error occured while retrieving Users"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var get_user = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, user, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.get_user(req)];
            case 1:
                user = _a.sent();
                res.send(user);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(500).send({
                    message: error_8.message || "Some error occured while retrieving your data"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var edit_user = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, user_status, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.edit_user(req)];
            case 1:
                user_status = _a.sent();
                res.send(user_status);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                res.status(500).send({
                    message: error_9.message || "Some error occured while updating your data"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var change_password = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, password_status, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.change_password(req)];
            case 1:
                password_status = _a.sent();
                res.send(password_status);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                res.status(500).send({
                    message: error_10.message || "Some error occured while changing your password"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var request_verification_code = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, request_status, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.request_verification_code(req)];
            case 1:
                request_status = _a.sent();
                res.send(request_status);
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                res.status(500).send({
                    message: error_11.message ||
                        "Some error occured while requesting your account verification code"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var verify_account = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var oBLC, verification_status, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                oBLC = new _BLC();
                return [4 /*yield*/, oBLC.verify_account(req)];
            case 1:
                verification_status = _a.sent();
                res.send(verification_status);
                return [3 /*break*/, 3];
            case 2:
                error_12 = _a.sent();
                res.status(500).send({
                    message: error_12.message || "Some error occured while verifiying your account"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// #endregion
// #endregion
// #region Routes
// #region User
router.get("/" + getAllUsers, get_all_users);
router.get("/" + getSomeUsers, get_some_users);
router.get("/" + getUser, get_user);
router.post("/" + createUser, create_user);
router.put("/" + editUser, edit_user);
router["delete"]("/" + deleteUser, delete_user);
router.put("/" + changePassword, change_password);
router.post("/" + requestVerificationCode, request_verification_code);
router.put("/" + verifyAccount, verify_account);
router.get("/" + getUserTypes, get_all_user_types);
router.put("/" + changeUserType, change_user_type);
router.put("/" + changeLocation, change_location);
// #endregion
// #region Language
router.post("/" + routes.changeLanguage, function (req, res) {
    var language = req.body.language;
    if (language !== "EN" && language !== "AR") {
        throw new Error("Invalid Request!");
    }
    try {
        _LANGUAGE.init(language);
        res.send("Language changed to " + _LANGUAGE.getLanguage());
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Some error occured while changing the language"
        });
    }
});
// #endregion
// #endregion
module.exports = router;
