// PRODUCT ( SAN PHAM )

// ORDER ( DON HANG)

// BANNER ( BANNER )

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
const getAddCategoryPage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Add Category",
      header: "partials/headerAdmin",
      page: "admin/addCategory",
    },
  });
};

// ACCOUNT ( TAI KHOAN )

// FEEDBACK ( PHAN HOI )

// STORE-INFORMATION ( THONG TIN CUA HANG)

export default { getCategoryPage, getAddCategoryPage };
