import categoryModel from "../services/CategoryModel";
import userModel from "../services/UserModel";
import productModel from "../services/ProductModel";
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
  const data = [
    {
      name: "1",
      mon: "2",
      tongtien: 2345678,
    },
    {
      name: "1",
      mon: "2",
      tongtien: 2345678,
    },
    {
      name: "1",
      mon: "2",
      tongtien: 2345678,
    },
    {
      name: "1",
      mon: "2",
      tongtien: 2345678,
    },
  ];
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/historyProduct",
      data,
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
  const user = await userModel.login(userData);

  if (user) {
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      isLoggedIn: true,
    };

    res.send("ĐĂNG NHẬP THÀNH CÔNG");
  } else {
    res.status(401).send("Đăng nhập thất bại");
  }
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

  // api
  login,
  sendFeedback,
};
