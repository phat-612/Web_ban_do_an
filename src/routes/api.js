import express from "express";
import adminController from "../controllers/AdminControllers";

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
router.post(
  "/editProduct",
  upload.single("productImage"),
  adminController.editProduct
);
router.post("/updateShopInfo", adminController.updateInfoShop);

export default router;
