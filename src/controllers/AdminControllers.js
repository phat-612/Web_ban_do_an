// PRODUCT ( SAN PHAM )
const getProductPage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Product",
      header: "partials/headerAdmin",
      page: "admin/product",
    },
  });
};

const getAddProductPage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Add Product",
      header: "partials/headerAdmin",
      page: "admin/addProduct",
    },
  });
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
  res.render("main", {
    data: {
      title: "Category",
      header: "partials/headerAdmin",
      page: "admin/category",
    },
  });
};

// ACCOUNT ( TAI KHOAN )
const getAccountPage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Account",
      header: "partials/headerAdmin",
      page: "admin/account",
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
  res.render("main", {
    data: {
      title: "Product",
      header: "partials/headerAdmin",
      page: "admin/shopInfor",
    },
  });
};

export default {
  getProductPage,
  getAddProductPage,
  getOrderPage,
  getBannerPage,
  getCategoryPage,
  getAccountPage,
  getFeedbackPage,
  getShopInforPage,
};
