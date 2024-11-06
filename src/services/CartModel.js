import pool from "../config/db";

const deleteProduct = async (idUser, idProduct) => {
  const [row, field] = await pool.execute(
    "DELETE FROM `cart` WHERE `idUser` = ? AND `idProduct` = ?",
    [idUser, idProduct]
  );
  return row;
};
const updateQuantityProduct = async (idUser, idProduct, quantity) => {
  const [row, field] = await pool.execute(
    "UPDATE `cart` SET `quantity` = ? WHERE `idUser` = ? AND `idProduct` = ?",
    [quantity, idUser, idProduct]
  );
  return row;
};
const addProduct = async (idUser, idProduct, quantity) => {
  const [row, field] = await pool.execute(
    "INSERT INTO `cart` (`idUser`, `idProduct`, `quantity`) VALUES (?, ?, ?)",
    [idUser, idProduct, quantity]
  );
  return row;
};
const getCart = async (idUser) => {
  const [rows, field] = await pool.execute(
    "SELECT * FROM `cart` WHERE `idUser` = ?",
    [idUser]
  );
  return rows;
};
export default {
  deleteProduct,
  updateQuantityProduct,
  addProduct,
  getCart,
};
