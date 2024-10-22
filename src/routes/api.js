import express from "express";
import adminController from "../controllers/AdminControllers";

const router = express.Router();

router.post("/addCategory", adminController.addCategory);

export default router;
