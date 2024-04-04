import express from "express";
import { mainApp } from "./mainApp";
import { profileDB } from "./config/profileDB";

// const port: number = 2345;
const app = express();

mainApp(app);
const server = app.listen(() => {
  profileDB();
});

process.on("uncaughtException", (error: any) => {
  console.log(
    "Server is shutting down due to an uncaught exception: ",
    error.message
  );
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log(
    "Server is shutting down due to an unhandled rejection: ",
    reason.message
  );

  server.close(() => {
    process.exit(1);
  });
});
