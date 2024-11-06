import shopModel from "../services/ShopModel";

const globalVariables = async (req, res, next) => {
  try {
    res.locals.userLogin = null;
    if (req.session.user) {
      res.locals.userLogin = req.session.user;
    }
    const infoShop = await shopModel.getInfoShop();
    res.locals.infoShop = infoShop[0];
    next();
  } catch (error) {
    next(error);
  }
};

export default globalVariables;
