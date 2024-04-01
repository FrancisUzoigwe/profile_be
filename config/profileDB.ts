import mongoose from "mongoose";

const url: string = "mongodb://127.0.0.1:27017/profile-practice";

export const profileDB = () => {
  mongoose.connect(url).then(() => {
    console.log("Database connection established");
  });
};
