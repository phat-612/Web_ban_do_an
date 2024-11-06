import express from "express";
import userController from "../controllers/UserController";
import { checkLogin, checkStatus } from "../middlewares/login";
const router = express.Router();

// Routes
router.get("/", userController.getUserHomePage);
router.get("/menu", userController.getUserMenuPage);
router.get("/feedback", userController.getUserFeedback);
router.get("/cart", userController.getCartPage);
// profile
router.get("/profile/:id", checkLogin, checkStatus, userController.getProfile);
router.get("/profileAddress", userController.getProfileAddress);
router.get("/listAddress", userController.getListAddress);
router.get("/historyProduct", userController.getHistoryProduct);
router.get("/rePassword", userController.getRePassword);
router.get("/deleteAccount", userController.getDeleteAccount);
router.get("/register", userController.getRegister);

export default router;
