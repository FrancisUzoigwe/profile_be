"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const profileDB_1 = require("./config/profileDB");
const port = 2345;
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
const server = app.listen(port, () => {
    (0, profileDB_1.profileDB)();
});
process.on("uncaughtException", (error) => {
    console.log("Server is shutting down due to an uncaught exception: ", error.message);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("Server is shutting down due to an unhandled rejection: ", reason.message);
    server.close(() => {
        process.exit(1);
    });
});
