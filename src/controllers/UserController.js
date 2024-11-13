import categoryModel from "../services/CategoryModel";
import userModel from "../services/UserModel";
import productModel from "../services/ProductModel";
import cartModel from "../services/CartModel";
import orderModel from "../services/OrderModel";
import bannerModel from "../services/BannerModel";
import feedbackModel from "../services/FeedbackModel";
import bcrypt from "bcrypt";

// TRANG CHU
const getUserHomePage = async (req, res) => {
  const topProducts = await productModel.getLimitedProduct();
  const topNewFeedback = await feedbackModel.getTopNewFeedback();
  const user = req.session.user;
  const banners = await bannerModel.getAllBanner();
  res.render("main", {
    data: {
      title: "Home",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/home",
      script: "user/menu",
      user: user,
      products: topProducts,
      topNewFeedback,
      banners,
    },
  });
};

// THUC DON
const getUserMenuPage = async (req, res) => {
  const user = req.session.user;
  const { category, find } = req.query;
  let productList;
  // ưu tiên tìm kiếm hơn danh mục
  if (find) {
    productList = await productModel.getAllProduct(find);
  } else if (category) {
    productList = await productModel.getAllProduct(category);
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
  let cartProducts = await cartModel.getCartDetail(req.session.user.id);
  cartProducts = cartProducts.map((product) => {
    return {
      ...product,
      formatPrice: product.currentPrice.toLocaleString("vi-VN"),
    };
  });
  res.render("main", {
    data: {
      title: "Cart",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/cart",
      script: "user/cart",
      listAddress: listAddress,
      cartProducts: cartProducts,
    },
  });
};
// const addProductToCart = async (req, res) => {
//   const data = req.body;
//   const user = req.session.user;
//   const cartList = await cartModel.getCart(user.id);
//   const cartArr = [];

//   if (!user) {
//     return console.log("ban chua dang nhap");
//   }

//   for (let i = 0; i < data.productQuantity.length; i++) {
//     if (data.productQuantity[i] == 0) continue;

//     cartArr.push([user.id, data.productId[i], data.productQuantity[i]]);
//     // console.log(cartArr);
//   }
//   const existsProduct = await cartModel.findProductById(user.id, cartArr);
//   if (existsProduct.length < 0) {

//   }

//   await cartModel.addProduct(cartArr);
//   res.redirect("back");
// };

const addProductToCart = async (req, res) => {
  const data = req.body;
  const user = req.session.user;

  // Kiểm tra nếu người dùng chưa đăng nhập
  if (!user) {
    console.log("Bạn chưa đăng nhập");
    return res.redirect("/login");
  }

  // Tạo danh sách sản phẩm và số lượng từ dữ liệu nhận được
  const cartArr = [];
  for (let i = 0; i < data.productQuantity.length; i++) {
    if (data.productQuantity[i] > 0) {
      cartArr.push([user.id, data.productId[i], data.productQuantity[i]]);
    }
  }

  // Sử dụng hàm addOrUpdateProductsInCart để cập nhật hoặc thêm sản phẩm vào giỏ hàng
  await cartModel.addOrUpdateProductsInCart(user.id, cartArr);

  // Chuyển hướng trở lại trang trước và thông báo thêm thành công
  res.redirect("back");
};
const updateQuantityCart = async (req, res) => {
  const { idProduct, quantity } = req.body;
  const user = req.session.user;
  try {
    if (quantity == 0) {
      await cartModel.deleteProduct(user.id, idProduct);
      return res.json({ status: true, message: "Xóa sản phẩm thành công" });
    }
    await cartModel.updateQuantityProduct(user.id, idProduct, quantity);
    return res.json({ status: true, message: "Cập nhật số lượng thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ status: false, message: "Cập nhật số lượng thất bại" });
  }
};
const updateIsBuyCart = async (req, res) => {
  const { idCart, isBuy } = req.body;
  await cartModel.updateIsBuyProduct(idCart, isBuy);
  return res.json({ status: true, message: "Cập nhật thành công" });
};
const addOrder = async (req, res) => {
  const data = req.body;
  const user = req.session.user;
  const cartProducts = await cartModel.getCartDetail(user.id);
  const dataDetailOrder = [];
  cartProducts.forEach((product) => {
    if (product.isBuy) {
      dataDetailOrder.push([
        product.idProduct,
        product.quantity,
        product.currentPrice,
      ]);
    }
  });
  let total = cartProducts.reduce(
    (acc, product) => acc + product.currentPrice * product.quantity,
    0
  );
  const dataOrder = {
    idUser: user.id,
    name: data.nameDelivery,
    phone: data.phoneDelivery,
    address: data.addressDelivery,
    note: data.description,
    total,
    status: 1,
  };
  await orderModel.addOrder(dataOrder, dataDetailOrder);

  return res.redirect("/historyProduct");
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

  // Lấy tất cả đơn hàng
  const orders = await orderModel.getAllOrderFull();

  // Nhóm các sản phẩm theo id đơn hàng
  const orderFull = orders.reduce((acc, item) => {
    const existingOrder = acc.find((order) => order.id === item.id);

    if (existingOrder) {
      // Nếu đơn hàng đã tồn tại, chỉ cần thêm sản phẩm vào mảng products
      existingOrder.products.push({
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        currentPrice: item.currentPrice,
        description: item.description,
      });
    } else {
      // Nếu chưa có đơn hàng, tạo mới đơn hàng và thêm sản phẩm đầu tiên vào
      acc.push({
        id: item.id,
        createdAt: item.created_at,
        customerName: item.customerName,
        phone: item.phone,
        address: item.address,
        total: item.total,
        status: item.status,
        products: [
          {
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
            currentPrice: item.currentPrice,
            description: item.description,
          },
        ],
      });
    }

    return acc;
  }, []);

  // Sắp xếp: trạng thái trước (status !== 6) và ngày mới nhất trước
  orderFull.sort((a, b) => {
    if (a.status === 6 && b.status !== 6) return 1;
    if (a.status !== 6 && b.status === 6) return -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Trả về dữ liệu và render ra view
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/historyProduct",
      user,
      orderFull,
    },
  });
};
// hoàn tác đơn hàng
const restoreOrder = async (req, res, next) => {
  const orderId = req.params.id;
  await orderModel.restoreOrder(orderId);
  res.redirect("back");
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
    return res.s;
  }

  const user = await userModel.login(email);

  // Kiểm tra nếu người dùng không tồn tại hoặc tài khoản bị khóa
  if (!user || user.status === 3) {
    return res.status(400).send("Tài khoản không tồn tại");
  }

  if (user && user.status === 2) {
    return res.status(400).send("Tài khoản bị vô hiểu hóa");
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
      if (user.role === 0) {
        return res.redirect("/admin");
      }
      return res.redirect("back");
    } else {
      return res.status(400).send("Thông tin đăng nhập không chính xác");
    }
  } else {
    return res.status(400).send("Tài khoản không tồn tại");
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
  res.redirect("back");
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
  updateIsBuyCart,
  addOrder,
  restoreOrder,
};
