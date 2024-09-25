import express from "express";
import userRouter from "./user";
import adminRouter from "./admin";
import apiRouter from "./api";

const router = express.Router();

router.use("/", userRouter);
router.use("/admin", adminRouter);
router.use("/api", apiRouter);

export default router;
