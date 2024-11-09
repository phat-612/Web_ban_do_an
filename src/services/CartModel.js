import pool from "../config/db";

const deleteProduct = async (idUser, idProduct) => {
  const [row, field] = await pool.execute(
    "DELETE FROM `carts` WHERE `idUser` = ? AND `idProduct` = ?",
    [idUser, idProduct]
  );
  return row;
};
const updateQuantityProduct = async (idUser, idProduct, quantity) => {
  const [row, field] = await pool.execute(
    "UPDATE `carts` SET `quantity` = ? WHERE `idUser` = ? AND `idProduct` = ?",
    [quantity, idUser, idProduct]
  );
  return row;
};
const updateIsBuyProduct = async (idCart, isBuy) => {
  const [row, field] = await pool.execute(
    "UPDATE `carts` SET `isBuy` = ? WHERE `id` = ?",
    [isBuy, idCart]
  );
  return row;
};
const addProduct = async (cartArr) => {
  const [row, field] = await pool.query(
    "INSERT INTO `carts` (`idUser`, `idProduct`, `quantity`) VALUES ?",
    [cartArr]
  );
  return row;
};

const findProductsInCart = async (idUser, productIds) => {
  const [rows] = await pool.query(
    "SELECT * FROM `carts` WHERE idUser = ? AND idProduct IN (?)",
    [idUser, productIds]
  );
  return rows; // Trả về danh sách các sản phẩm đã tồn tại trong giỏ hàng
};

const addOrUpdateProductsInCart = async (idUser, cartArr) => {
  const productIds = cartArr.map((item) => item[1]);
  const existingProducts = await findProductsInCart(idUser, productIds);

  const existingProductMap = {};
  existingProducts.forEach((product) => {
    existingProductMap[product.idProduct] = product;
  });

  const productsToUpdate = [];
  const productsToInsert = [];

  cartArr.forEach(([userId, productId, quantity]) => {
    if (existingProductMap[productId]) {
      const newQuantity =
        parseInt(existingProductMap[productId].quantity) + parseInt(quantity);
      productsToUpdate.push([newQuantity, userId, productId]);
    } else {
      productsToInsert.push([userId, productId, quantity]);
    }
  });

  if (productsToUpdate.length > 0) {
    await Promise.all(
      productsToUpdate.map(async ([quantity, userId, productId]) => {
        await pool.query(
          "UPDATE `carts` SET quantity = ? WHERE idUser = ? AND idProduct = ?",
          [quantity, userId, productId]
        );
      })
    );
  }

  if (productsToInsert.length > 0) {
    await pool.query(
      "INSERT INTO `carts` (idUser, idProduct, quantity) VALUES ?",
      [productsToInsert]
    );
  }
};

const getCart = async (idUser) => {
  const [rows, field] = await pool.execute(
    "SELECT * FROM `carts` WHERE `idUser` = ?",
    [idUser]
  );
  return rows;
};
const getCartDetail = async (idUser) => {
  const [rows, field] = await pool.execute(
    `SELECT  c.idProduct, p.name, p.currentPrice, p.image, c.quantity, p.description, c.isBuy, c.id
        FROM carts c
        JOIN products p ON c.idProduct = p.id
        WHERE c.idUser = ?`,
    [idUser]
  );
  return rows;
};
export default {
  deleteProduct,
  updateQuantityProduct,
  addProduct,
  getCart,
  getCartDetail,
  updateIsBuyProduct,
  findProductsInCart,
  addOrUpdateProductsInCart,
};
