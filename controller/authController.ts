import { Request, Response } from "express";
import authentication from "../model/authentication";
import bcrypt from "bcrypt";
import { streamUpload } from "../config/streamifier";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await authentication.create({
      email,
      userName,
      password: hash,
    });
    return res.status(201).json({
      message: "Account created successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while creating user",
      data: error.message,
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authentication.findOne({ email });
    if (user) {
      const checked = await bcrypt.compare(password, user.password!);
      if (checked) {
        return res.status(201).json({
          message: "Signed in sucessfully..!!",
          data: checked,
        });
      } else {
        return res.status(403).json({
          message: "Invalid password, check password and try again",
        });
      }
    } else {
      return res.status(400).json({
        message: "Error occured while signing in",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while signing in",
      data: error.message,
    });
  }
};

export const deleteUserAccount = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await authentication.findByIdAndDelete(userID);

    return res.status(201).json({
      message: "Account deleted successfuly",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while deleting user account",
      data: error.message,
    });
  }
};

export const updateUserImage = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { public_id, secure_url }: any = await streamUpload(req);

    const user = await authentication.findByIdAndUpdate(
      userID,
      {
        image: secure_url,
        imageID: public_id,
      },
      { new: true }
    );

    return res.status(201).json({
      message: "Image updated successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error updating user image",
      data: error.message,
    });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { firstName, lastName, phoneNumber, address } = req.body;
    const user = await authentication.findByIdAndUpdate(
      userID,
      { firstName, lastName, phoneNumber, address },
      { new: true }
    );

    return res.status(201).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await authentication.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: `Getting  ${users.length}'s details`,
      data: users,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured getting all users",
      data: error.message,
    });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await authentication.findOne({ userID });

    return res.status(200).json({
      message: "User's details are available",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occurred getting user's details",
      data: error.message,
    });
  }
};
