import express from "express";
import adminController from "../controllers/AdminControllers";

const router = express.Router();
// danh mục sản phẩm bên admin
router.post("/addCategory", adminController.addCategory);
router.post("/deleteCategory", adminController.deleteCategory);

export default router;
