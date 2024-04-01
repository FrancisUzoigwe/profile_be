import mongoose, { Document, Schema, model } from "mongoose";

interface iAuth {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  image?: string;
  imageID?: string;
  posts: {}[];
}

interface iAutData extends iAuth, Document {}

const authentication = new Schema<iAutData>({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  email: { type: String },
  password: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  image: { type: String },
  imageID: { type: String },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "posts",
    },
  ],
});

export default model<iAutData>("auths", authentication);
