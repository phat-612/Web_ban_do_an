import express from "express";
import adminController from "../controllers/AdminControllers";

const router = express.Router();

// PRODUCT ( SAN PHAM )
router.get("/", adminController.getProductPage);
router.get("/product/addProduct", adminController.getAddProductPage);
router.get("/product/edit/:id", adminController.getEditProductPage);
router.get("/product/view/:id", adminController.getViewDetailProductPage);
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

// SHOP-INFORMATION ( THONG TIN CUA HANG)
router.get("/shopInfor", adminController.getShopInforPage);

export default router;
