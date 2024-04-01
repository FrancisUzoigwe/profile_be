import { Application, Request, Response, json } from "express";
import cors from "cors";
import morgan from "morgan";
import auth from "./router/authenticationRouter";
export const mainApp = (app: Application) => {
  app.use(json());
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "DELETE", "POST", "PATCH"],
    })
  );
  app.get("/api/v1/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Success......!!",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Error occured",
        data: error.message,
      });
    }
  });
  app.use("/api/v1/", auth);
};
