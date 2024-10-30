const checkLogin = async (req, res, next) => {
  const user = req.session.user;

  if (user && user.role === 0) {
    res.redirect("back");
  } else {
    next();
  }
};
const checkRole = async (req, res, next) => {
  const user = req.session.user;

  if (!user || user.role === 1) {
    return res.status(403).send("Bạn không có quyền truy cập trang này");
  } else {
    next();
  }
};
const checkStatus = async (req, res, next) => {
  const user = req.session.user;
  if (user && user.status === 1) {
    next();
  } else if (user && user.status === 2) {
    return res
      .status(403)
      .send(
        "Tài khoản của bạn đã vi phạm quy định.Vui lòng liên hệ quản trị để biết thêm chi tiết."
      );
  } else {
    res.redirect("/login");
  }
};

export { checkLogin, checkRole, checkStatus };
