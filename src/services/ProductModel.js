import pool from "../config/db";

const getAllProduct = async () => {
  const [row, fields] = await pool.execute(
    "SELECT products.id, products.name, currentPrice, description, products.image, categories.name as nameCategory FROM products JOIN categories on products.idCategory = categories.id"
  );
  return row;
};
const getProductById = async (id) => {
  const [row, fields] = await pool.execute(
    "SELECT products.id, products.name, currentPrice, description, categories.name as nameCategory, products.image FROM products JOIN categories on products.idCategory = categories.id WHERE products.id = ? ",
    [id]
  );
  return row;
};
const getProductByCategory = async (category) => {
  const [row, fields] = await pool.execute(
    "SELECT * FROM products WHERE idCategory = ?",
    [category]
  );
  return row;
};
const getItemAddMore = async (id) => {
  const [row, fields] = await pool.execute(
    "SELECT idProductAdd, products.name as nameProductAdd FROM itemAddMore JOIN products on products.id = itemAddMore.idProductAdd WHERE idProduct = ?",
    [id]
  );
  return row;
};
const isProductDelete = async (id) => {
  const [row, fields] = await pool.execute(
    "SELECT idProduct FROM orderDetail WHERE idProduct = ?",
    [id]
  );
  const [row2, fields2] = await pool.execute(
    "SELECT idProduct FROM itemAddMore WHERE idProduct = ?",
    [id]
  );
  if (row.length > 0 || row2.length > 0) {
    return false;
  }
  return true;
};
const addProduct = async (data) => {
  const [row, fields] = await pool.execute(
    "INSERT INTO `products` (`name`, `currentPrice`, `description`, `image`, `idCategory`) VALUES (?, ?, ?, ?, ?)",
    [
      data.name,
      data.currentPrice,
      data.description,
      data.image,
      data.idCategory,
    ]
  );
  const insertId = row.insertId;

  await pool.execute(
    "INSERT INTO `priceHistory` (`idProduct`, `oldPrice`, `newPrice`) VALUES (?, ?, ?)",
    [insertId, 0, data.currentPrice]
  );
  if (data.addMore) {
    if (typeof data.addMore === "string") {
      data.addMore = [data.addMore];
    }
    if (data.addMore) {
      const values = data.addMore.map((item) => [insertId, item]);
      await pool.query(
        "INSERT INTO `itemAddMore` (`idProduct`, `idProductAdd`) VALUES ?",
        [values]
      );
    }
  }
};
const editProduct = async (data) => {
  // cập nhật thông tin, hình ảnh, nếu giá thay đổi thì cập nhật thêm bảng giá
  // nếu không có file nào được upload thì không cập nhật hình ảnh
  await pool.execute(
    "UPDATE `products` SET `name` = ?, `currentPrice` = ?, `description` = ?, `image` = ?, `idCategory` = ? WHERE `products`.`id` = ?",
    [
      data.name,
      data.currentPrice,
      data.description,
      data.image,
      data.idCategory,
      data.id,
    ]
  );
  // kiểm tra giá cũ và giá mới
  const [row2, fields2] = await pool.execute(
    "SELECT currentPrice FROM products WHERE id = ?",
    [data.id]
  );
  const currentPrice = row2[0].currentPrice;
  if (data.currentPrice !== currentPrice) {
    await pool.execute(
      "INSERT INTO `priceHistory` (`idProduct`, `oldPrice`, `newPrice`) VALUES (?, ?, ?)",
      [data.id, currentPrice, data.currentPrice]
    );
  }
  // cập nhật bảng itemAddMore
  if (data.addMore) {
    if (typeof data.addMore === "string") {
      data.addMore = [data.addMore];
    }
    if (data.addMore) {
      await pool.execute("DELETE FROM `itemAddMore` WHERE `idProduct` = ?", [
        data.id,
      ]);
      const values = data.addMore.map((item) => [data.id, item]);
      await pool.query(
        "INSERT INTO `itemAddMore` (`idProduct`, `idProductAdd`) VALUES ?",
        [values]
      );
    }
  }
};
const deleteProduct = async (id) => {
  await pool.execute("DELETE FROM `carts` WHERE `carts`.`idProduct` = ?", [id]);
  await pool.execute(
    "DELETE FROM `priceHistory` WHERE `priceHistory`.`idProduct` = ?",
    [id]
  );
  await pool.execute(
    "DELETE FROM `itemAddMore` WHERE `itemAddMore`.`idProduct` = ?",
    [id]
  );
  await pool.execute("DELETE FROM `products` WHERE `products`.`id` = ?", [id]);
};
export default {
  addProduct,
  getAllProduct,
  getProductById,
  isProductDelete,
  editProduct,
  deleteProduct,
  getItemAddMore,
  getProductByCategory,
};
