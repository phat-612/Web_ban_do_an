import express from "express";
import adminController from "../controllers/AdminControllers";
import { isAdmin } from "../middlewares/login";
const router = express.Router();

// PRODUCT ( SAN PHAM )
router.get("/", isAdmin, adminController.getProductPage);
router.get("/product/addProduct", isAdmin, adminController.getAddProductPage);
router.get("/product/edit/:id", isAdmin, adminController.getEditProductPage);
router.get(
  "/product/view/:id",
  isAdmin,
  adminController.getViewDetailProductPage
);
// ORDER ( DON HANG)
router.get("/order", isAdmin, adminController.getOrderPage);

// BANNER ( BANNER )
router.get("/banner", isAdmin, adminController.getBannerPage);

// CATEGORY ( DANH MUC )
router.get("/category", isAdmin, adminController.getCategoryPage);

// ACCOUNT ( TAI KHOAN )
router.get("/account", isAdmin, adminController.getAccountPage);

// FEEDBACK ( PHAN HOI )
router.get("/feedback", isAdmin, adminController.getFeedbackPage);

// SHOP-INFORMATION ( THONG TIN CUA HANG)
router.get("/shopInfor", isAdmin, adminController.getShopInforPage);

export default router;
