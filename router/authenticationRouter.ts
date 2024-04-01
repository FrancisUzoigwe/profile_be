import express from "express";
import {
  createUser,
  getAllUser,
  getOneUser,
  signinUser,
  updateUserImage,
  updateUserInfo,
} from "../controller/authController";
import multer from "multer";

const uploads = multer().single("image");
const router = express.Router();
router.route("/register").post(createUser);
router.route("/login").post(signinUser);
router.route("/:userID/update-image").patch(uploads, updateUserImage);
router.route("/:userID/update-details").patch(updateUserInfo);
router.route("/:userID/get-details").get(getOneUser);
router.route("/get-all-details").get(getAllUser);

export default router;
