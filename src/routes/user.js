import express from "express";
import userController from "../controllers/UserController";

const router = express.Router();

// Routes
router.get("/", userController.getUserHomePage);
router.get("/menu", userController.getUserMenuPage);
router.get("/feedback", userController.getUserFeedback);

// profile
router.get("/profile/:id", userController.getProfile);
router.get("/profileAddress", userController.getProfileAddress);
router.get("/historyProduct", userController.historyProduct);
router.get("/rePassword", userController.rePassword);
router.get("/deleteAccount", userController.deleteAccount);
router.get("/register", userController.getRegister);

export default router;
