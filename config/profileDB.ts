import mongoose from "mongoose";

const url: any =
  "mongodb+srv://kossyuzoigwe:kossyuzoigwe@francisuzoigwe.3irljsp.mongodb.net/profile_practice";

export const profileDB = () => {
  mongoose.connect(url).then(() => {
    console.log("Database connection established");
  });
};
