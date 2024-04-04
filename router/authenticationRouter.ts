import express from "express";
import {
  createUser,
  deleteUserAccount,
  getAllUser,
  getOneUser,
  signinUser,
  updateUserInfo,
} from "../controller/authController";
import multer from "multer";

const uploads = multer().single("image");
const router = express.Router();
router.route("/register").post(createUser);
router.route("/login").post(signinUser);
router.route("/:userID/update-details").patch(uploads, updateUserInfo);
router.route("/:userID/get-details").get(getOneUser);
router.route("/get-all-details").get(getAllUser);
router.route("/:userID/delete-account").delete(deleteUserAccount);

export default router;
