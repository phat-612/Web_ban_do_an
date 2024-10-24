import categoryModel from "../services/CategoryModel";
import shopModel from "../services/ShopModel";
import productModel from "../services/ProductModel";
import userModel from "../services/UserModel";

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

  res.render("main", {
    data: {
      title: "Add Product",
      header: "partials/headerAdmin",
      page: "admin/addProduct",
      categorys: categoryList,
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

// ORDER ( DON HANG)
const getOrderPage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Order",
      header: "partials/headerAdmin",
      page: "admin/order",
    },
  });
};

// BANNER ( BANNER )
const getBannerPage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Banner",
      header: "partials/headerAdmin",
      page: "admin/banner",
    },
  });
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
  console.log(req.body);
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
  const row = await userModel.getAllUser();
  res.render("main", {
    data: {
      title: "Account",
      header: "partials/headerAdmin",
      page: "admin/account",
      users: row,
    },
  });
};

// FEEDBACK ( PHAN HOI )
const getFeedbackPage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Feedback",
      header: "partials/headerAdmin",
      page: "admin/feedback",
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

export default {
  // GET PAGE
  getProductPage,
  getAddProductPage,
  getOrderPage,
  getBannerPage,
  getCategoryPage,
  getAccountPage,
  getFeedbackPage,
  getShopInforPage,

  // API

  addCategory,
  deleteCategory,
  addProduct,
  updateInfoShop,
};
