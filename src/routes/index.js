import express from "express";
import userRouter from "./user";
import adminRouter from "./admin";
import apiRouter from "./api";
import globalVariables from "../middlewares/globalVariables";
const initWebRouter = (app) => {
  app.use(globalVariables);
  app.use((req, res, next) => {
    res.locals.messageError = req.session.messageError;
    res.locals.messageSuccess = req.session.messageSuccess;
    delete req.session.messageError;
    delete req.session.messageSuccess;
    next();
  });
  app.use("/", userRouter);
  app.use("/admin", adminRouter);
  app.use("/api", apiRouter);
};

export default initWebRouter;
