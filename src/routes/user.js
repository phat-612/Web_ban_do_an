import express from "express";
import userController from "../controllers/UserController";
import { isUser } from "../middlewares/login";
const router = express.Router();

// Routes
router.get("/", userController.getUserHomePage);
router.get("/menu", userController.getUserMenuPage);
router.get("/feedback", userController.getUserFeedback);
router.get("/cart", isUser, userController.getCartPage);
// profile
router.get("/profile", isUser, userController.getProfile);
router.get("/addAddress", isUser, userController.getProfileAddress);
router.get("/listAddress", isUser, userController.getListAddress);
router.get("/historyProduct", isUser, userController.getHistoryProduct);
router.get("/rePassword", isUser, userController.getRePassword);
router.get("/deleteAccount", isUser, userController.getDeleteAccount);
router.get("/register", userController.getRegister);
// lấy lại mật khẩu
export default router;
