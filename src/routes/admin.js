import express from "express";
import adminController from "../controllers/AdminControllers";

const router = express.Router();

// PRODUCT ( SAN PHAM )
router.get("/product", adminController.getProductPage);

// ORDER ( DON HANG)
router.get("/order", adminController.getOrderPage);

// BANNER ( BANNER )
router.get("/banner", adminController.getBannerPage);

// CATEGORY ( DANH MUC )
router.get("/category", adminController.getCategoryPage);

// ACCOUNT ( TAI KHOAN )
router.get("/account", adminController.getAccountPage);

// FEEDBACK ( PHAN HOI )
router.get("/feedback", adminController.getFeedbackPage);

// STORE-INFORMATION ( THONG TIN CUA HANG)
router.get("/shopInfor", adminController.getShopInforPage);

export default router;
