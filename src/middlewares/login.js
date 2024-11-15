const isUser = async (req, res, next) => {
  const user = req.session.user;
  if (!user || user.status !== 1) {
    res.redirect("back");
  } else {
    next();
  }
};
const isAdmin = async (req, res, next) => {
  const user = req.session.user;
  // console.log(user);
  if (!user || user.role !== 0) {
    return res.redirect("/admin/login");
  } else {
    next();
  }
};
const isLogin = async (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    return next();
  }
  if (user.role === 0) {
    return res.redirect("/admin");
  }
  return res.redirect("/");
};

export { isUser, isAdmin, isLogin };
