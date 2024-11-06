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
  console.log(user);
  if (!user || user.role !== 0) {
    return res.status(403).send("Bạn không có quyền truy cập trang này");
  } else {
    next();
  }
};

export { isUser, isAdmin };
