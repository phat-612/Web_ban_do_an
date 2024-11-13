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
  res.redirect("/admin");
};
const deleteProduct = async (req, res) => {
  const { id, image } = req.body;
  const isDelete = await productModel.isProductDelete(id);
  if (isDelete) {
    // xóa ảnh sản phẩm
    fs.unlinkSync(`src/public/imgs/products/${image}`);
    await productModel.deleteProduct(id);
    return res.redirect("/admin");
  }
  //  thông báo lỗi
  res.redirect("/admin");
};
// ORDER ( DON HANG)
const getOrderPage = async (req, res) => {
  const orders = await orderModel.getAllOrderFull();

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
  res.render("main", {
    data: {
      title: "Order",
      header: "partials/headerAdmin",
      page: "admin/order",
      orderFull: orderFull,
    },
  });
};

// cập nhật trạng thái đơn hàng
const getOrderStatus = async (req, res) => {
  return console.log(req.body);
  const { id, status } = req.body;
  await orderModel.updateStatusOrder(id, status);
  res.redirect("back");
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
  await bannerModel.addBanner(data);
  res.redirect("/admin/banner");
};

const editBanner = async (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(req.file);
  const bannerImage = req.file ? req.file.filename : null;
  if (bannerImage) {
    data.image = bannerImage;
    if (fs.existsSync(`src/public/imgs/banners/${data.oldImage}`)) {
      fs.unlinkSync(`src/public/imgs/banners/${data.oldImage}`);
    }
  } else {
    data.image = data.oldImage;
  }
  await bannerModel.editBanner(data);
  res.redirect("back");
};

const deleteBanner = async (req, res) => {
  const { id, image } = req.body;
  fs.unlinkSync(`src/public/imgs/banners/${image}`);
  await bannerModel.deletebanner(id);
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
      categorys: categoryList,
    },
  });
};

const addCategory = async (req, res) => {
  const { nameCategory } = req.body;
  await categoryModel.addCategory(nameCategory);
  res.redirect("/admin/category");
};
const deleteCategory = async (req, res) => {
  const { id } = req.body;
  await categoryModel.deleteCategory(id);
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
  res.redirect("/admin/account");
};

const setRole = async (req, res) => {
  const { idUser, role } = req.body;
  await userModel.updateRole(idUser, role);
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
  await shopModel.updateInfoShop(data);
  res.redirect("/admin/shopInfor");
};
// trang thái đơn hàng
const updateStatusOrder = async (req, res) => {
  const { id, status } = req.body;
  await orderModel.updateStatusOrder(id, status);
  res.redirect("/admin/order");
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
  // API
  getOrderStatus,
  addCategory,
  deleteCategory,
  addProduct,
  editProduct,
  deleteProduct,
  updateInfoShop,
  setStatus,
  setRole,
  addBanner,
  editBanner,
  deleteBanner,
  updateStatusOrder,
};
