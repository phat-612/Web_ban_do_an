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
const addProduct = async (idUser, idProduct, quantity) => {
  const [row, field] = await pool.execute(
    "INSERT INTO `carts` (`idUser`, `idProduct`, `quantity`) VALUES (?, ?, ?)",
    [idUser, idProduct, quantity]
  );
  return row;
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
    `SELECT  c.idProduct, p.name, p.currentPrice, p.image, c.quantity, p.description
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
};
