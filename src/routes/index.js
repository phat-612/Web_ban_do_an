import express from "express";
import userRouter from "./user";
import adminRouter from "./admin";
import apiRouter from "./api";
import { checkRole } from "../middlewares/login";
const initWebRouter = (app) => {
  app.use("/", userRouter);
  app.use("/admin", checkRole, adminRouter);
  app.use("/api", apiRouter);
};

export default initWebRouter;
