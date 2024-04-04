"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const url = "mongodb+srv://kossyuzoigwe:kossyuzoigwe@francisuzoigwe.3irljsp.mongodb.net/profile_practice?retryWrites=true&w=majority";
const profileDB = () => {
    mongoose_1.default.connect(url).then(() => {
        console.log("Database connection established");
    });
};
exports.profileDB = profileDB;
