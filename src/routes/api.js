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
// account admin
router.post("/updateStatusUser", adminController.setStatus);
router.post("/updateRoleUser", adminController.setRole);
router.post(
  "/editProduct",
  upload.single("productImage"),
  adminController.editProduct
);
router.post("/deleteProduct", adminController.deleteProduct);
// cập nhật thông tin của hàng
router.post("/updateShopInfo", adminController.updateInfoShop);
// USER API-------------------------------------------------------------------------------

// thêm sản phẩm vào gio hang
router.post("/addProductToCart", userController.addProductToCart);
// cập nhật hoặc xóa sản phẩm ra khỏi giỏ hàng
router.post("/updateQuantityCart", userController.updateQuantityCart);
router.post("/updateIsBuyCart", userController.updateIsBuyCart);
router.post("/addOrder", userController.addOrder);
// feedback
router.post("/sendFeedback", userController.sendFeedback);
// login
router.post("/login", userController.login);
// register
router.post("/register", userController.apiRegister);
// sửa profile
router.post("/editProfile/:id", userController.editProfile);
// thêm địa chỉ
router.post("/address", userController.addAddress);
// địa chỉ mặc định
router.post("/setDefaultAddress", userController.setDefaultAddress);
// sửa địa chỉ
router.post("/editAddress", userController.editAddress);
// xóa địa chỉ
router.get("/deleteAddress/:id/:isDefault", userController.deleteAddress);
// xóa session
router.post("/destroy", userController.logout);
// đổi mật khẩu
router.post("/changePassword", userController.changePassword);
// hủy tài khoản
router.post("/cancelAccount", userController.cancelAccount);
// hủy đơn hàng
router.get("/cancelOrder/:id", userController.cancelOrder);
// lay mat khauz
router.post("/reset", userController.reset);

export default router;
