import express from "express";
import adminController from "../controllers/AdminControllers";

const router = express.Router();

// CATEGORY ( DANH MUC )
router.get("/category", adminController.getCategoryPage);
router.get("/addCategory", adminController.getAddCategoryPage);

export default router;
