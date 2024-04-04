"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const multer_1 = __importDefault(require("multer"));
const uploads = (0, multer_1.default)().single("image");
const router = express_1.default.Router();
router.route("/register").post(authController_1.createUser);
router.route("/login").post(authController_1.signinUser);
router.route("/:userID/update-details").patch(uploads, authController_1.updateUserInfo);
router.route("/:userID/get-details").get(authController_1.getOneUser);
router.route("/get-all-details").get(authController_1.getAllUser);
router.route("/:userID/delete-account").delete(authController_1.deleteUserAccount);
exports.default = router;
