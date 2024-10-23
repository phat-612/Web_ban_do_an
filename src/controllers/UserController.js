import categoryModel from "../services/CategoryModel";

const getUserHomePage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Home",
      header: "partials/headerUser",
      page: "user/home",
    },
  });
};

const getUserMenuPage = async (req, res) => {
  categoryList = await categoryModel.getAllCategory();
  res.render("main", {
    data: {
      title: "Menu",
      header: "partials/headerUser",
      page: "user/menu",
      categorys: categoryList,
    },
  });
};

export default { getUserHomePage, getUserMenuPage };
