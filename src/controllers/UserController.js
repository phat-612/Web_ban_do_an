import categoryModel from "../services/CategoryModel";
import userModel from "../services/UserModel";
import productModel from "../services/ProductModel";

const getUserHomePage = async (req, res) => {
  const user = req.session.user;
  res.render("main", {
    data: {
      title: "Home",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/home",
      user: user,
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
  const user = req.session.user;
  if (!id) {
    return res.status(400).send("ID không hợp lệ");
  }
  const userProfile = await userModel.userProfile(id);
  console.log(userProfile);
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
const historyProduct = async (req, res) => {
  const user = req.session.user;
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/historyProduct",
      user,
    },
  });
};
const rePassword = async (req, res) => {
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
const deleteAccount = async (req, res) => {
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
    return res.status(400).send("Vui lòng nhập đầy đủ email và mật khẩu");
  }

  const user = await userModel.login({ email, password });
  if (user) {
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
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
  res.redirect("/");
};
// api edit profile

const editProfile = async (req, res) => {
  const data = req.body;
  return console.log(data);
  const user = req.session.user;

  if (!user) {
    return res.status(401).send("Bạn phải đăng nhập để sửa thông tin cá nhân");
  }

  // Kiểm tra xem dữ liệu đầu vào có hợp lệ không
  if (!data.name || !data.email || !data.phone || !data.sex || !data.date) {
    return res.status(400).send("Vui lòng điền đầy đủ thông tin");
  }

  await userModel.editProfile(user.id, data);

  res.redirect(`/profile/${user.id}`);
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
  login,
  sendFeedback,
  apiRegister,
  editProfile,
};
