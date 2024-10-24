import pool from "../config/db";

const getAllProduct = async () => {
  const [row, fields] = await pool.execute(
    "SELECT products.id, products.name, currentPrice, description, categories.name as nameCategory FROM products JOIN categories on products.idCategory = categories.id"
  );
  return row;
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
};
export default { addProduct, getAllProduct };
