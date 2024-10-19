import express from "express";
import userRouter from "./user";
import adminRouter from "./admin";
import apiRouter from "./api";

const initWebRouter = (app) => {
  app.use("/", userRouter);
  app.use("/admin", adminRouter);
  app.use("/api", apiRouter);
};

export default initWebRouter;
