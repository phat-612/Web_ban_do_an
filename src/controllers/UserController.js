import categoryModel from "../services/CategoryModel";
import userModel from "../services/UserModel";
import productModel from "../services/ProductModel";
import bcrypt from "bcrypt";

const getUserHomePage = async (req, res) => {
  const user = req.session.user;
  const productList = await productModel.getAllProduct();
  const success = req.session.success || ""; // Đảm bảo là chuỗi rỗng nếu không có thông báo
  const error = req.session.error || ""; // Đảm bảo là chuỗi rỗng nếu không có thông báo

  req.session.success = null;
  req.session.error = null;
  res.render("main", {
    data: {
      title: "Home",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/home",
      script: "/alert",
      user: user,
      success: success,
      error: error,
      products: productList,
    },
  });
};

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
// start profile
const getProfile = async (req, res) => {
  const id = req.session.user.id;
  const user = req.session.user;
  if (!id) {
    return res.status(400).send("ID không hợp lệ");
  }
  const userProfile = await userModel.userProfile(id);
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
  if (!email || !password) {
    req.session.error = "Vui lòng nhập đầy đủ email và mật khẩu";
    return res.redirect("/");
  }

  const user = await userModel.login(email);

  if (!user || user.status == 3) {
    req.session.error = "Tài khoản không tồn tại";
    return res.redirect("/");
  }

  if (user && user.status == 2) {
    req.session.error = "Tài khoản đã bị khóa do vi phạm tiêu chuẩn cộng đồng";
    return res.redirect("/");
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (user && user.status == 1) {
    if (isPassword) {
      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        status: user.status,
        role: user.role,
      };
      req.session.success = "Đăng nhập thành công!";
    } else {
      req.session.error = "Mật khẩu không chính xác";
    }
  } else {
    req.session.error = "Tài khoản không tồn tại";
  }

  return res.redirect("/");
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
    id: user.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    sex: data.sex,
    date: data.date,
    status: "1",
  };

  await userModel.editProfile(user.id, updatedData);

  res.redirect(`/profile/${user.id}`);
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
export default {
  getUserHomePage,
  getUserMenuPage,
  getUserFeedback,
  getProfile,
  getProfileAddress,
  getHistoryProduct,
  getRePassword,
  getDeleteAccount,
  getRegister,
  getListAddress,
  // api
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
};
