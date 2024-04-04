"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const authenticationRouter_1 = __importDefault(require("./router/authenticationRouter"));
const mainApp = (app) => {
    app.use((0, express_1.json)());
    app.use((0, morgan_1.default)("dev"));
    app.use((0, cors_1.default)({
        origin: "*",
        methods: ["GET", "DELETE", "POST", "PATCH"],
    }));
    app.get("/api/v1/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Success......!!",
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "Error occured",
                data: error.message,
            });
        }
    });
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Success......!!",
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "Error occured",
                data: error.message,
            });
        }
    });
    app.use("/api/v1/", authenticationRouter_1.default);
};
exports.mainApp = mainApp;
