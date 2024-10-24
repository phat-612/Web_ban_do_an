import shopModel from "../services/ShopModel";

const globalVariable = async (req, res, next) => {
  try {
    const infoShop = await shopModel.getInfoShop();
    res.locals.infoShop = infoShop[0];
    next();
  } catch (error) {
    next(error);
  }
};

export default infoShopMiddleware;
