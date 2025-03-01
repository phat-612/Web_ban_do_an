import categoryModel from "../services/CategoryModel";
import shopModel from "../services/ShopModel";
import productModel from "../services/ProductModel";
import userModel from "../services/UserModel";
import orderModel from "../services/OrderModel";
import bannerModel from "../services/BannerModel";
import feedbackModel from "../services/FeedbackModel";
import fs from "fs";

// đăng nhập
const getLoginPage = (req, res) => {
  res.render("main", {
    data: {
      title: "Login",
      page: "admin/login",
    },
  });
};
// PRODUCT ( SAN PHAM )
const getProductPage = async (req, res) => {
  const productList = await productModel.getAllProduct();
  res.render("main", {
    data: {
      title: "Product",
      header: "partials/headerAdmin",
      page: "admin/product",
      products: productList,
    },
  });
};

const getAddProductPage = async (req, res) => {
  const categoryList = await categoryModel.getAllCategory();
  const products = await productModel.getAllProduct();
  res.render("main", {
    data: {
      title: "Add Product",
      header: "partials/headerAdmin",
      page: "admin/addProduct",
      categorys: categoryList,
      products: products,
      script: "admin/addProduct",
    },
  });
};
const getEditProductPage = async (req, res) => {
  const { id } = req.params;
  const product = await productModel.getProductById(id);
  const categoryList = await categoryModel.getAllCategory();
  const products = await productModel.getAllProduct();
  const itemAddMore = await productModel.getItemAddMore(id);
  products.map((item) => {
    itemAddMore.map((itemAddMore) => {
      if (item.id === itemAddMore.idProductAdd) {
        item.selected = true;
      }
    });
  });
  console.log({
    data: {
      title: "Edit Product",
      header: "partials/headerAdmin",
      page: "admin/editProduct",
      product: product[0],
      categorys: categoryList,
      products: products,
      script: "admin/editProduct",
    },
  });
  res.render("main", {
    data: {
      title: "Edit Product",
      header: "partials/headerAdmin",
      page: "admin/editProduct",
      product: product[0],
      categorys: categoryList,
      products: products,
      script: "admin/editProduct",
    },
  });
};
const getViewDetailProductPage = async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.getProductById(id);
  const productAddMore = await productModel.getItemAddMore(id);
  if (product.length === 0) {
    next();
  }
  res.render("main", {
    data: {
      title: "Detail Product",
      header: "partials/headerAdmin",
      page: "admin/viewDetailProduct",
      script: "admin/viewDetailProduct",
      product: product[0],
      productAddMore: productAddMore,
    },
  });
};
const addProduct = async (req, res) => {
  const data = req.body;
  const productImage = req.file.filename;
  data.image = productImage;
  await productModel.addProduct(data);
  req.session.messageSuccess = "Thêm sản phẩm thành công";
  res.redirect("/admin");
};
const editProduct = async (req, res) => {
  // nếu có ảnh mới thì xóa ảnh cũ đi

  const data = req.body;
  const productImage = req.file ? req.file.filename : null;
  if (productImage) {
    data.image = productImage;
    // kiểm tra file có tồn tại hay không
    if (fs.existsSync(`src/public/imgs/products/${data.oldImage}`)) {
      fs.unlinkSync(`src/public/imgs/products/${oldImage}`);
    }
  } else {
    data.image = data.oldImage;
  }
  await productModel.editProduct(data);
  req.session.messageSuccess = "Cập nhật sản phẩm thành công";
  // req.session.messageError = "Cập nhật sản phẩm thành công";
  res.redirect("/admin");
};
const deleteProduct = async (req, res) => {
  const { id, image } = req.body;
  const isDelete = await productModel.isProductDelete(id);
  if (isDelete) {
    // xóa ảnh sản phẩm
    fs.unlinkSync(`src/public/imgs/products/${image}`);
    await productModel.deleteProduct(id);
    req.session.messageSuccess = "Xóa sản phẩm thành công";
    return res.redirect("/admin");
  }
  //  thông báo lỗi
  req.session.messageError = "Không thể xóa sản phẩm đã được đặt hàng";
  res.redirect("/admin");
};
const updateStatusProduct = async (req, res) => {
  const { id, field, status } = req.body;
  // nếu field không phải isExit và isBussiness thì trả về lỗi
  // console.log(req.body);
  if (field !== "isExit" && field !== "isBussiness") {
    res.status(400).json({ message: "Trường không hợp lệ" });
  }
  await productModel.updateStatusProduct(id, field, status);
  res.status(200).json({ message: "Cập nhật trạng thái thành công" });
};
// ORDER ( DON HANG)
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

const getOrderPage = async (req, res) => {
  const orders = await orderModel.getAllOrderFull();
  // Nhóm các sản phẩm theo đơn hàng
  // accumulator là mảng rổng []
  const orderFull = orders.reduce((acc, item) => {
    const existingOrder = acc.find((order) => order.id === item.id);
    if (existingOrder) {
      // Nếu đã có, chỉ cần thêm sản phẩm vào mảng products
      existingOrder.products.push({
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        currentPrice: item.currentPrice,
        description: item.description,
      });
    } else {
      // Nếu chưa có, tạo mới đơn hàng và thêm sản phẩm đầu tiên vào
      acc.push({
        id: item.id,
        createdAt: new Intl.DateTimeFormat("vi-VN").format(
          new Date(item.created_at)
        ),
        customerName: item.customerName,
        phone: item.phone,
        address: item.address,
        total: item.total,
        status: item.status,
        statusText: getStatusText(item.status),
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
  // 6 đã hủy
  orderFull.sort((a, b) => {
    if (a.status === 6 && b.status !== 6) return 1;
    if (a.status !== 6 && b.status === 6) return -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  res.render("main", {
    data: {
      title: "Order",
      header: "partials/headerAdmin",
      page: "admin/order",
      orderFull: orderFull, // Dữ liệu đã xử lý
    },
  });
};

// cập nhật trạng thái đơn hàng
const updateStatusOrder = async (req, res) => {
  const { status, orderId } = req.body;
  const currentOrder = await orderModel.getOrders(orderId);
  const currentStatus = currentOrder.status;

  if (parseInt(status) > parseInt(currentStatus)) {
    if (currentStatus == 4 && status == 5) {
      req.session.messageError = "Đơn hàng đã hoàn thành, không thể hủy";
      return res.redirect("back");
    }
    if (status == 4) {
      const orderProducts = await orderModel.getAllOrderFullById(orderId);
      const { idProduct, quantity } = orderProducts;
      await orderModel.updateSold(quantity, idProduct);
    }
    // Cập nhật trạng thái của đơn hàng
    await orderModel.updateStatusOrder(status, orderId);
    req.session.messageSuccess = "Cập nhật trạng thái đơn hàng thành công";
    res.redirect("back");
  } else {
    req.session.messageError = "Không thể đổi trạng thái.";
    res.redirect("back");
    // return res.status(400).send("Không thể đổi trạng thái.");
  }
};

// BANNER ( BANNER )
const getBannerPage = async (req, res) => {
  const banners = await bannerModel.getAllBanner();
  res.render("main", {
    data: {
      title: "Banner",
      header: "partials/headerAdmin",
      page: "admin/banner",
      banners,
    },
  });
};
const addBanner = async (req, res) => {
  const data = req.body;
  const bannerImage = req.file.filename;
  data.image = bannerImage;
  data.idEditor = req.session.user.id;
  await bannerModel.addBanner(data);
  req.session.messageSuccess = "Thêm banner thành công";
  res.redirect("/admin/banner");
};

const editBanner = async (req, res) => {
  const data = req.body;
  const bannerImage = req.file ? req.file.filename : null;
  if (bannerImage) {
    data.image = bannerImage;
    if (fs.existsSync(`src/public/imgs/banners/${data.oldImage}`)) {
      fs.unlinkSync(`src/public/imgs/banners/${data.oldImage}`);
    }
  } else {
    data.image = data.oldImage;
  }
  data.idEditor = req.session.user.id;
  await bannerModel.editBanner(data);
  req.session.messageSuccess = "Cập nhật banner thành công";
  res.redirect("back");
};

const deleteBanner = async (req, res) => {
  const { id, image } = req.body;
  fs.unlinkSync(`src/public/imgs/banners/${image}`);
  await bannerModel.deletebanner(id);
  req.session.messageSuccess = "Xóa banner thành công";
  return res.redirect("/admin");
};

// CATEGORY ( DANH MỤC )
const getCategoryPage = async (req, res) => {
  const { name } = req.query;
  let categoryList;
  if (name) {
    categoryList = await categoryModel.getCategoryByName(name);
  } else {
    categoryList = await categoryModel.getAllCategory();
  }

  res.render("main", {
    data: {
      title: "Category",
      header: "partials/headerAdmin",
      page: "admin/category",
      script: "admin/category",
      categorys: categoryList,
    },
  });
};

const addCategory = async (req, res) => {
  const { nameCategory } = req.body;
  if (
    !nameCategory ||
    typeof nameCategory !== "string" ||
    nameCategory.trim() === ""
  ) {
    req.session.messageError = "Tên Danh Mục Sai Cú Pháp";
    res.redirect("/admin/category");
  }
  try {
    await categoryModel.addCategory(nameCategory.trim());
    req.session.messageSuccess = "Thêm Danh Mục Thành Công";
    res.redirect("/admin/category");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      req.session.messageError = "Không được thêm danh mục trùng tên";
      res.redirect("/admin/category");
    }
  }
};

const editCategory = async (req, res) => {
  const data = req.body;
  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    req.session.messageError = "Tên Danh Mục Sai Cú Pháp";
    res.redirect("/admin/category");
  }
  try {
    await categoryModel.editCategory(data);
    req.session.messageSuccess = "Cập nhật danh mục thành công";
    res.redirect("/admin/category");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      req.session.messageError = "Không được cập nhật danh mục trùng tên";
      res.redirect("/admin/category");
    }
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.body;
  await categoryModel.deleteCategory(id);
  req.session.messageSuccess = "Xóa danh mục thành công";
  res.redirect("/admin/category");
};

// ACCOUNT ( TAI KHOAN )
const getAccountPage = async (req, res) => {
  const find = req.query.find;
  let row;
  if (find) {
    row = await userModel.findUserByEmail(find);
  } else {
    row = await userModel.getAllUser();
  }
  res.render("main", {
    data: {
      title: "Account",
      header: "partials/headerAdmin",
      page: "admin/account",
      users: row,
      script: "admin/account",
    },
  });
};
const setStatus = async (req, res) => {
  const { idUser, status } = req.body;
  await userModel.updateStatus(idUser, status);
  req.session.messageSuccess = "Cập nhật trạng thái tài khoản thành công";
  res.redirect("/admin/account");
};

const setRole = async (req, res) => {
  const { idUser, role } = req.body;
  await userModel.updateRole(idUser, role);
  req.session.messageSuccess = "Cập nhật quyền tài khoản thành công";
  res.redirect("/admin/account");
};
// FEEDBACK ( PHAN HOI )
const getFeedbackPage = async (req, res) => {
  let feedbacks = await feedbackModel.getAllFeedback();
  feedbacks = feedbacks.map((feedback) => {
    return {
      ...feedback,
      created_at: new Intl.DateTimeFormat("vi-VN").format(
        new Date(feedback.created_at)
      ),
    };
  });
  res.render("main", {
    data: {
      title: "Feedback",
      header: "partials/headerAdmin",
      page: "admin/feedback",
      feedbacks: feedbacks,
      script: "admin/feedback",
    },
  });
};

// STORE-INFORMATION ( THONG TIN CUA HANG)
const getShopInforPage = async (req, res) => {
  const row = await shopModel.getInfoShop();
  res.render("main", {
    data: {
      title: "Product",
      header: "partials/headerAdmin",
      page: "admin/shopInfor",
      shopInfo: row[0],
    },
  });
};

const updateInfoShop = async (req, res) => {
  const data = req.body;
  const idUser = req.session.user.id;
  data.idEditor = idUser;
  await shopModel.updateInfoShop(data);
  req.session.messageSuccess = "Cập nhật thông tin cửa hàng thành công";
  res.redirect("/admin/shopInfor");
};

// DELIVERY ( VAN CHUYEN )

const getDeliveryListPage = async (req, res) => {
  const orderList = await orderModel.getOrdersByStatusPedding();
  res.render("main", {
    data: {
      title: "Delivery List",
      header: "partials/delivery/headerDelivery",
      page: "admin/deliveryPage/shippingOrderList",
      orderList,
    },
  });
};

const getDeliveryDetailPage = async (req, res) => {
  const id = req.params.id;

  const order = await orderModel.getAllOrderFullById(id);

  console.log(order);

  res.render("main", {
    data: {
      title: "Delivery Detail",
      header: "partials/delivery/headerDeliveryDetail",
      page: "admin/deliveryPage/shippingOrderDetail",
    },
  });
};

export default {
  // GET PAGE
  getLoginPage,
  getProductPage,
  getAddProductPage,
  getEditProductPage,
  getViewDetailProductPage,
  getOrderPage,
  getBannerPage,
  getCategoryPage,
  getAccountPage,
  getFeedbackPage,
  getShopInforPage,
  getStatusText,
  getDeliveryListPage,
  getDeliveryDetailPage,
  // API
  addCategory,
  deleteCategory,
  editCategory,
  addProduct,
  editProduct,
  deleteProduct,
  updateStatusProduct,
  updateInfoShop,
  setStatus,
  setRole,
  addBanner,
  editBanner,
  deleteBanner,
  updateStatusOrder,
};
