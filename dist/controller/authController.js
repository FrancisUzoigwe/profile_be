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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneUser = exports.getAllUser = exports.updateUserInfo = exports.deleteUserAccount = exports.signinUser = exports.createUser = void 0;
const authentication_1 = __importDefault(require("../model/authentication"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const streamifier_1 = require("../config/streamifier");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, userName } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = yield authentication_1.default.create({
            email,
            userName,
            password: hash,
        });
        return res.status(201).json({
            message: "Account created successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while creating user",
            data: error.message,
        });
    }
});
exports.createUser = createUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authentication_1.default.findOne({ email });
        if (user) {
            const checked = yield bcrypt_1.default.compare(password, user.password);
            if (checked) {
                return res.status(201).json({
                    message: "Signed in sucessfully..!!",
                    data: user,
                });
            }
            else {
                return res.status(403).json({
                    message: "Invalid password, check password and try again",
                });
            }
        }
        else {
            return res.status(400).json({
                message: "Account doesn't exist in the database",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while signing in",
            data: error.message,
        });
    }
});
exports.signinUser = signinUser;
const deleteUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authentication_1.default.findByIdAndDelete(userID);
        return res.status(201).json({
            message: "Account deleted successfuly",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while deleting user account",
            data: error.message,
        });
    }
});
exports.deleteUserAccount = deleteUserAccount;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { public_id, secure_url } = yield (0, streamifier_1.streamUpload)(req);
        const { firstName, lastName, phoneNumber, address } = req.body;
        const user = yield authentication_1.default.findByIdAndUpdate(userID, {
            firstName,
            lastName,
            phoneNumber,
            address,
            image: secure_url,
            imageID: public_id,
        }, { new: true });
        return res.status(201).json({
            message: "User updated successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
});
exports.updateUserInfo = updateUserInfo;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield authentication_1.default.find().sort({
            createdAt: -1,
        });
        return res.status(200).json({
            message: `Getting  ${users.length}'s details`,
            data: users,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured getting all users",
            data: error.message,
        });
    }
});
exports.getAllUser = getAllUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authentication_1.default.findById(userID);
        return res.status(200).json({
            message: "User's details are available",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occurred getting user's details",
            data: error.message,
        });
    }
});
exports.getOneUser = getOneUser;
