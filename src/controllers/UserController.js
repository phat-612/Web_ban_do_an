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
  if (!category && !find) {
    productList = await productModel.getAllProduct();
  } else if (find) {
    productList = await productModel.getAllProduct(null, find);
  } else if (category) {
    productList = await productModel.getAllProduct(category, null);
  }
  const categoryList = await categoryModel.getAllCategory();
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
  req.session.messageSuccess = "Gửi Phản Hồi Thành Công";
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

const addProductToCart = async (req, res) => {
  const data = req.body;
  const user = req.session.user;

  // Kiểm tra nếu người dùng chưa đăng nhập
  if (!user.id) {
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

  req.session.messageSuccess = "Thêm sản phẩm vào giỏ hàng thành công";
  return res.redirect("back");
};
const updateQuantityCart = async (req, res) => {
  const { idProduct, quantity } = req.body;
  const user = req.session.user;
  try {
    if (quantity == 0) {
      await cartModel.deleteProduct(user.id, idProduct);
      req.session.messageSuccess = "Xóa sản phẩm thành công";
      return res.redirect("back");
    }
    await cartModel.updateQuantityProduct(user.id, idProduct, quantity);
    req.session.messageSuccess = "Cập nhật số lượng sản phẩm thành công";
    return res.redirect("back");
  } catch (error) {
    req.session.messageError = "Cập nhật sản phẩm thành công";
    return res.redirect("back");
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
  let cartProducts = await cartModel.getCartDetail(user.id);
  cartProducts = cartProducts.filter(
    (product) => product.isExit && product.isBussiness
  );
  if (cartProducts.length === 0) {
    req.session.messageError = "Giỏ hàng của bạn đang trống";
    return res.redirect("back");
  }
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
      script: "user/profiles/profileAddress",
    },
  });
};
//  api address
const addAddress = async (req, res) => {
  const userId = req.session.user.id;
  const data = req.body;
  if (data.phone.length < 10) {
    return res.status(400).send("Số điện thoại không hợp lệ");
  }
  await userModel.address(data, userId);
  return res.redirect("/listAddress");
};
const getEditAddress = async (req, res) => {
  const user = req.session.user;
  const idAddress = req.params.idAddress;
  const address = await userModel.getAddressById(idAddress);
  if (!address) {
    return res.status(404).send("Địa chỉ không tồn tại");
  }
  res.render("main", {
    data: {
      title: "Profile",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/profiles/editAddress",
      user,
      address,
      script: "user/profiles/editAddress",
    },
  });
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
// trang site
const getGuideOrderPage = (req, res) => {
  res.render("main", {
    data: {
      title: "Hướng dẫn đặt hàng",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/guideOrder",
    },
  });
};
const getPaymentAndOrderPolicyPage = (req, res) => {
  res.render("main", {
    data: {
      title: "Chính sách đặt hàng và thanh toán",
      header: "partials/headerUser",
      footer: "partials/footerUser",
      page: "user/paymentAndOrderPolicy",
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
  if (data.phone.length < 10) {
    return res.status(400).send("Số điện thoại không hợp lệ");
  }
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
const getStatusText = (status) => {
  switch (status) {
    case 1:
      return "Đặt Hàng";
    case 2:
      return "Tiếp Nhận";
    case 3:
      return "Đang Vận Chuyển";
    case 4:
      return "Thành Công";
    case 5:
      return "Bị Hủy";
    case 6:
      return "Đã Hủy";
    default:
      return "Không Xác Định";
  }
};
// lịch sử đơn hàng
const getHistoryProduct = async (req, res) => {
  const user = req.session.user;
  // Lấy tất cả đơn hàng
  const orders = await orderModel.getAllOrderFullByIdUser(user.id);

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
    res.redirect("/profile");
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
    req.session.messageError = "Vui lòng điền đầy đủ thông tin";
    return res.redirect("back");
  }
  const user = await userModel.login(email);
  if (!user || user.status === 3) {
    req.session.messageError = "Tài khoản không tồn tại";
    return res.redirect("back");
  }
  if (user && user.status === 2) {
    req.session.messageError = "Tài khoản bị khóa";
    return res.redirect("back");
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
      req.session.messageSuccess = "Đăng nhập thành công";
      return res.redirect("back");
    } else {
      req.session.messageError = "Sai mật khẩu";
      return res.redirect("back");
    }
  } else {
    req.session.messageError = "Tài khoản không hoạt động";
    return res.redirect("back");
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
  req.session.messageSuccess = "Đăng ký thành công";
  return res.redirect("/");
};

// api edit profile

const editProfile = async (req, res) => {
  const data = req.body;
  const currentUser = req.session.user;

  if (!data.name || !data.email || !data.phone || !data.sex || !data.date) {
    req.session.messageError = "Vui lòng điền đầy đủ thông tin";
    return res.redirect("back");
    // return res.status(400).send("Vui lòng điền đầy đủ thông tin");
  }

  const updatedData = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    sex: data.sex,
    date: data.date,
  };

  const dataUser = await userModel.getAllUser();

  // Kiểm tra email đã tồn tại, ngoại trừ user hiện tại
  const isDuplicate = dataUser.some(
    (user) => user.email === data.email && user.id !== currentUser.id
  );

  if (isDuplicate) {
    req.session.messageError = "Email đã tồn tại";
    return res.redirect("back");
    // return res.status(400).send("Email đã tồn tại");
  }

  await userModel.editProfile(currentUser.id, updatedData);

  req.session.user = {
    ...currentUser,
    ...updatedData, // Cập nhật các thông tin mới
  };
  req.session.messageSuccess = "Cập nhật thông tin thành công";
  return res.redirect("/profile/");
};

// người dùng hủy tài khoản
const cancelAccount = async (req, res) => {
  const user = req.session.user;
  await userModel.cancelAccount(user.id);
  req.session.destroy();
  res.redirect("/");
};
// hủy đơn hàng
const cancelOrder = async (req, res) => {
  const id = req.params.id;
  const statusOrder = await orderModel.getAllOrderFullById(id);
  if (statusOrder.status === 4 || statusOrder.status === 5) {
    req.session.messageError =
      "Đơn hàng đã thanh toán hoặc đã giao hàng không thể hủy";
    return res.redirect("back");
  }
  await userModel.cancelOrderDetail(id);
  req.session.messageSuccess = "Hủy đơn hàng thành công";
  res.redirect("back");
};

export default {
  getUserHomePage,
  getUserMenuPage,
  getUserFeedback,
  getCartPage,
  getProfile,
  getProfileAddress,
  getEditAddress,
  getHistoryProduct,
  getRePassword,
  getDeleteAccount,
  getRegister,
  getListAddress,
  getGuideOrderPage,
  getPaymentAndOrderPolicyPage,
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
  getStatusText,
};
