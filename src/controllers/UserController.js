import categoryModel from "../services/CategoryModel";
import UserModel from "../services/UserModel";
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
  res.render("main", {
    data: {
      title: "Menu",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/menu",
      categorys: categoryList,
    },
  });
};
// start profile
const getProfile = async (req, res) => {
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/profile",
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
const login = async (req, res) => {
  const userData = req.body;
  await UserModel.login(userData);
  res.send("ĐĂNG NHẬP THÀNH CÔNG");
};
export default {
  getUserHomePage,
  getUserMenuPage,
  getProfile,
  getProfileAddress,
  historyProduct,
  rePassword,
  deleteAccount,
  // api
  login,
};
