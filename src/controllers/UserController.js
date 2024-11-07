import categoryModel from "../services/CategoryModel";
import userModel from "../services/UserModel";
import productModel from "../services/ProductModel";
import cartModel from "../services/CartModel";
import bcrypt from "bcrypt";

// TRANG CHU
const getUserHomePage = async (req, res) => {
  const productList = await productModel.getAllProduct();
  req.session.success = null;
  req.session.error = null;
  res.render("main", {
    data: {
      title: "Home",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/home",
      script: "/alert",
      products: productList,
    },
  });
};

// THUC DON
const getUserMenuPage = async (req, res) => {
  const user = req.session.user;
  const { category } = req.query;
  let productList;
  if (category) {
    productList = await productModel.getProductByCategory(category);
  } else {
    productList = await productModel.getAllProduct();
  }
  const categoryList = await categoryModel.getAllCategory();
  // console.log(productList);
  res.render("main", {
    data: {
      title: "Menu",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/menu",
      categorys: categoryList,
      products: productList,
      user: user,
      script: "user/menu",
    },
  });
};

const getUserFeedback = async (req, res) => {
  res.render("main", {
    data: {
      title: "Feedback",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/sendFeedback",
    },
  });
};
const sendFeedback = async (req, res) => {
  const data = req.body;
  await userModel.sendFeedback(data);
  res.redirect("/");
};
// cart
const getCartPage = async (req, res) => {
  let listAddress = await userModel.getAllAddress(req.session.user.id);

  res.render("main", {
    data: {
      title: "Cart",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/cart",
      script: "user/cart",
      listAddress: listAddress,
    },
  });
};
const addProductToCart = async (req, res) => {
  const data = req.body;
  const user = req.session.user;

  if (!user) {
    return console.log("ban chua dang nhap");
  }
  const cartArr = [];

  for (let i = 0; i < data.productQuantity.length; i++) {
    console.log(data.productQuantity[i]);
    if (data.productQuantity[i] == 0) continue;

    cartArr.push([user.id, data.productId[i], data.productQuantity[i]]);
  }
  await cartModel.addProduct(cartArr);
  res.redirect("back");
};
const updateQuantityCart = async (req, res) => {
  const { idProdcut, quantity } = req.body;
  const user = req.session.user;
  if (quantity == 0) {
    await userModel.deleteProductCart(user.id, idProdcut);
    return res.json({ success: true, message: "Xóa sản phẩm thành công" });
  }
  await userModel.updateQuantityCart(user.id, idProdcut, quantity);
  return res.json({ success: true, message: "Cập nhật số lượng thành công" });
};
// end cart
// start profile
const getProfile = async (req, res) => {
  const user = req.session.user;
  const userProfile = await userModel.userProfile(user.id);
  if (!user) {
    return res.status(404).send("Người dùng không tồn tại");
  }

  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/profile",
      userProfile: userProfile,
      user: user,
    },
  });
};
// địa chỉ
const getProfileAddress = async (req, res) => {
  const user = req.session.user;
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/profileAddress",
      user: user,
    },
  });
};
//  api address
const addAddress = async (req, res) => {
  const userId = req.session.user.id;
  const data = req.body;
  await userModel.address(data, userId);
  res.redirect("/listAddress");
};
// danh sách địa chỉ
const getListAddress = async (req, res) => {
  const user = req.session.user;
  const addresses = await userModel.getAllAddress(user.id);
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/listAddress",
      user,
      addresses,
    },
  });
};
// địa chỉ mặc định
const setDefaultAddress = async (req, res) => {
  const userId = req.session.user.id;
  const address = req.body;
  if (address.isDefault === "1") {
    return res
      .status(400)
      .send("Vui lòng chọn địa chỉ khác làm địa chỉ mặc định!");
  } else {
    await userModel.setDefaultAddress(userId);
    await userModel.defaultAddress(address.id, userId);
  }
  res.redirect("/listAddress");
};
// sửa địa chỉ
const editAddress = async (req, res) => {
  const data = req.body;
  await userModel.editAddress(data.id, data);
  res.redirect("/listAddress");
};
// xóa địa chỉ

const deleteAddress = async (req, res) => {
  const userId = req.session.user.id;
  const addressId = req.params;
  if (addressId.isDefault === "1") {
    return res
      .status(400)
      .send(
        "Vui lòng chọn địa chỉ khác để xóa.Địa chỉ này là địa chỉ mật định!"
      );
  } else {
    await userModel.deleteAddress(addressId.id, userId);
  }
  res.redirect("/listAddress");
};
// lịch sử đơn hàng
const getHistoryProduct = async (req, res) => {
  const user = req.session.user;
  const orderList = await userModel.getAllOrder(user.id); //đơn hàng
  // sản phẩm trong đơn hàng
  const orders = await Promise.all(
    orderList.map(async (order) => {
      const productList = await userModel.getAllOrderDetail(order.id);
      return { ...order, productList };
    })
  );
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/historyProduct",
      user,
      orders,
    },
  });
};

// trang đổi mật khẩu
const getRePassword = async (req, res) => {
  const user = req.session.user;

  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/rePassword",
      user,
    },
  });
};
// đổi mật khẩu
const changePassword = async (req, res) => {
  const data = req.body;
  const user = req.session.user;
  const userData = await userModel.resetPassword(user.email, user.id);
  const isMatch = await bcrypt.compare(data.password, userData.password);
  if (isMatch) {
    const hashedPassword = await bcrypt.hash(data.newPassword1, 10);
    await userModel.updatePassword(user.id, hashedPassword);
    res.redirect("/profile/" + user.id);
  } else {
    res.status(401).send("Mật khẩu không chính xác.");
  }
};
const getDeleteAccount = async (req, res) => {
  const user = req.session.user;
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/deleteAccount",
      user,
    },
  });
};
// api login
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Vui lòng nhập đầy đủ email và mật khẩu",
    });
  }

  const user = await userModel.login(email);

  // Kiểm tra nếu người dùng không tồn tại hoặc tài khoản bị khóa
  if (!user || user.status === 3) {
    return res.json({ success: false, message: "Tài khoản không tồn tại" });
  }

  if (user && user.status === 2) {
    return res.json({
      success: false,
      message: "Tài khoản đã bị khóa do vi phạm tiêu chuẩn cộng đồng",
    });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (user && user.status === 1) {
    if (isPassword) {
      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        status: user.status,
        role: user.role,
      };
      return res.json({ success: true, message: "Đăng nhập thành công!" });
    } else {
      return res.json({ success: false, message: "Mật khẩu không chính xác" });
    }
  } else {
    return res.json({ success: false, message: "Tài khoản không tồn tại" });
  }
};

// desstroy session
const logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

// register
const getRegister = async (req, res) => {
  res.render("main", {
    data: {
      title: "Register",
      page: "user/profiles/register",
    },
  });
};
// api register

const apiRegister = async (req, res) => {
  const data = req.body;
  const emailUser = await userModel.login(data.email);
  if (emailUser) {
    return res.status(400).send("Email đã tồn tại");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const userData = {
    ...data,
    password: hashedPassword,
  };

  await userModel.apiRegister(userData);

  return res.redirect("/");
};

// api edit profile

const editProfile = async (req, res) => {
  const data = req.body;
  const user = req.session.user;
  if (!data.name || !data.email || !data.phone || !data.sex || !data.date) {
    return res.status(400).send("Vui lòng điền đầy đủ thông tin");
  }

  const updatedData = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    sex: data.sex,
    date: data.date,
  };

  await userModel.editProfile(user.id, updatedData);
  req.session.user = {
    ...user,
    email: updatedData.email,
    name: updatedData.name,
    phone: updatedData.phone,
  };
  res.redirect("/profile/");
};
// người dùng hủy tài khoản
const cancelAccount = async (req, res) => {
  const user = req.session.user;
  console.log("user", user);
  await userModel.cancelAccount(user.id);
  req.session.destroy();
  res.redirect("/");
};
// hủy đơn hàng
const cancelOrder = async (req, res) => {
  const id = req.params.id;
  await userModel.cancelOrderDetail(id);
  await userModel.cancelOrder(id);

  res.redirect("back");
};
// lấy lại mật khẩu
const reset = async (req, res) => {
  const { email, token, password } = req.body;
  return console.log(email, token, password);
  try {
    // Tìm user trong cơ sở dữ liệu bằng email
    const user = await userModel.login(email);
    if (!user) {
      return res.redirect("/password/reset?error=user_not_found");
    }

    // So sánh token trong cơ sở dữ liệu với token người dùng gửi lên
    const isTokenValid = await bcrypt.compare(token, user.passwordResetToken);
    if (!isTokenValid) {
      return res.redirect("/password/reset?error=invalid_token");
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUND)
    );

    // Cập nhật mật khẩu mới cho người dùng
    await userModel.resetPassword(email, hashedPassword);

    // Chuyển hướng về trang đăng nhập sau khi thay đổi mật khẩu thành công
    res.redirect("/login?success=password_reset");
  } catch (err) {
    console.error("Error during password reset:", err);
    res.redirect("/500"); // Có thể tạo một trang lỗi để hiển thị lỗi hệ thống
  }
};
export default {
  getUserHomePage,
  getUserMenuPage,
  getUserFeedback,
  getCartPage,
  getProfile,
  getProfileAddress,
  getHistoryProduct,
  getRePassword,
  getDeleteAccount,
  getRegister,
  getListAddress,
  // api
  reset,
  login,
  sendFeedback,
  apiRegister,
  editProfile,
  logout,
  addAddress,
  setDefaultAddress,
  editAddress,
  deleteAddress,
  changePassword,
  cancelAccount,
  cancelOrder,
  addProductToCart,
  updateQuantityCart,
};
