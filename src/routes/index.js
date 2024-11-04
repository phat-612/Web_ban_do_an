import express from "express";
import userRouter from "./user";
import adminRouter from "./admin";
import apiRouter from "./api";
import { checkRole } from "../middlewares/login";
import globalVariables from "../middlewares/globalVariables";
const initWebRouter = (app) => {
  app.use(globalVariables);
  app.use("/", userRouter);
  app.use("/admin", checkRole, adminRouter);
  app.use("/api", apiRouter);
};

export default initWebRouter;
