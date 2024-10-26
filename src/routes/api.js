import express from "express";
import adminController from "../controllers/AdminControllers";
import userController from "../controllers/UserController";
import upload from "../config/multer";

const router = express.Router();
// danh mục sản phẩm bên admin
router.post("/addCategory", adminController.addCategory);
router.post("/deleteCategory", adminController.deleteCategory);
router.post(
  "/addProduct",
  upload.single("productImage"),
  adminController.addProduct
);
// USER API
// feedback
router.post("/sendFeedback", userController.sendFeedback);
// login
router.post("/login", userController.login);
router.post(
  "/editProduct",
  upload.single("productImage"),
  adminController.editProduct
);
router.post("/updateShopInfo", adminController.updateInfoShop);
export default router;
