import pool from "../config/db";

const getAllCategory = async (req, res) => {
  const [rows, field] = await pool.execute("SELECT * FROM `categories`");
  return rows;
};
const getCategoryByName = async (name) => {
  let findString = `%${name}%`;
  const [rows, field] = await pool.execute(
    "SELECT * FROM `categories` WHERE `name` like ?",
    [findString]
  );
  return rows;
};
// api

// danh mục
const addCategory = async (nameCategory) => {
  try {
    const [row, field] = await pool.execute(
      "INSERT INTO `categories` (`name`) VALUES (?)",
      [nameCategory]
    );
    return row;
  } catch (error) {
    throw error;
  }
};

const editCategory = async (data) => {
  try {
    const [row, field] = await pool.execute(
      "UPDATE `categories` SET `name` = ? WHERE `id` = ?",
      [data.name, data.id]
    );
    return row;
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (id) => {
  const [row, field] = await pool.execute(
    "DELETE FROM `categories` WHERE `id` = ?",
    [id]
  );
  return row;
};
// sản phẩm
// const addProduct = async (product) => {
//   const [row, field] = await pool.execute(
//     "INSERT INTO `products` (`name`, `price`, `image`, `categoryId`) VALUES (?, ?, ?, ?)",
//     [product.name, product.price, product.image, product.categoryId]
//   );
//   return row;
// };

export default {
  addCategory,
  getAllCategory,
  deleteCategory,
  getCategoryByName,
  editCategory,
  // addProduct,
};
