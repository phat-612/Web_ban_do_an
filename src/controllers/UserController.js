import categoryModel from "../services/CategoryModel";
import userModel from "../services/UserModel";
import productModel from "../services/ProductModel";
import bcrypt from "bcrypt";

const getUserHomePage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Home",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/home",
    },
  });
};

const getUserMenuPage = async (req, res) => {
  const categoryList = await categoryModel.getAllCategory();
  const productList = await productModel.getAllProduct();
  res.render("main", {
    data: {
      title: "Menu",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/menu",
      categorys: categoryList,
      products: productList,
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
  if (!id) {
    return res.status(400).send("ID không hợp lệ");
  }
  const user = await userModel.userProfile(id);

  if (!user) {
    return res.status(404).send("Người dùng không tồn tại");
  }

  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/profile",
      user: user,
    },
  });
};

const getProfileAddress = async (req, res) => {
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/profileAddress",
    },
  });
};
const historyProduct = async (req, res) => {
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/historyProduct",
    },
  });
};
const rePassword = async (req, res) => {
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/rePassword",
    },
  });
};
const deleteAccount = async (req, res) => {
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/deleteAccount",
    },
  });
};
// api login
const apilogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Vui lòng nhập đầy đủ email và mật khẩu");
  }

  const user = await userModel.login({ email, password });

  if (user) {
    req.session.user = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      status: user.status,
      role: user.role,
      isLoggedIn: true,
    };
    res.redirect(`/profile/${user.id}`);
  } else {
    res.status(401).send("Email hoặc mật khẩu không đúng");
  }
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
  await userModel.apiRegister(data);
  res.send("/profile");
};
export default {
  getUserHomePage,
  getUserMenuPage,
  getUserFeedback,
  getProfile,
  getProfileAddress,
  historyProduct,
  rePassword,
  deleteAccount,
  getRegister,
  // api
  apilogin,
  sendFeedback,
  apiRegister,
};
