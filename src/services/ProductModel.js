import pool from "../config/db";

const getAllProduct = async () => {
  const [row, fields] = await pool.execute(
    "SELECT products.id, products.name, currentPrice, description, categories.name as nameCategory FROM products JOIN categories on products.idCategory = categories.id"
  );
  return row;
};
const getProductById = async (id) => {
  const [row, fields] = await pool.execute(
    "SELECT products.id, products.name, currentPrice, description, categories.name as nameCategory, products.image FROM products JOIN categories on products.idCategory = categories.id WHERE products.id = ?",
    [id]
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
const editProduct = async (data) => {
  console.log(
    data.name,
    data.currentPrice,
    data.description,
    data.image,
    data.idCategory,
    data.id,
    data.oldImage
  );
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
};
export default { addProduct, getAllProduct, getProductById, editProduct };
