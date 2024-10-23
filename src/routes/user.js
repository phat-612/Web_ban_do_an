import express from "express";
import userController from "../controllers/UserController";

const router = express.Router();

// Routes

router.get("/", userController.getUserHomePage);
router.get("/menu", userController.getUserMenuPage);

export default router;
