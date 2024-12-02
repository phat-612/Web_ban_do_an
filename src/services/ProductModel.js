import pool from "../config/db";

// format money
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  trailingZeroDisplay: "stripIfInteger",
});

const getAllProduct = async (filter = null) => {
  let query =
    "SELECT products.*, categories.id idCategory, categories.name nameCategory, productAdd.id idProductAdd, productAdd.name nameProductAdd, productAdd.currentPrice currentPriceProductAdd, productAdd.image imageProductAdd, productAdd.isExit isExitProductAdd , productAdd.isBussiness isBussinessProductAdd from products left JOIN categories on categories.id = products.idCategory left JOIN itemAddMore on products.id = itemAddMore.idProduct left JOIN products as productAdd on productAdd.id = itemAddMore.idProductAdd ";
  if (filter) {
    query += ` WHERE products.name LIKE '%${filter}%' OR categories.id LIKE '%${filter}%'`;
  }
  query += " ORDER BY products.isExit desc, products.isBussiness desc";
  console.log(query);
  const [row, fields] = await pool.execute(query);

  // const [row, fields] = await pool.execute(
  //   "SELECT products.id, products.name, currentPrice, description, products.image, categories.name as nameCategory FROM products JOIN categories on products.idCategory = categories.id"
  // );
  // console.log(row);
  let products = [];
  row.forEach((product) => {
    let index = products.findIndex((item) => item.id === product.id);
    if (index === -1) {
      products.push({
        id: product.id,
        name: product.name,
        currentPrice: formatter.format(product.currentPrice),
        description: product.description,
        image: product.image,
        idCategory: product.idCategory,
        nameCategory: product.nameCategory,
        isExit: product.isExit,
        isBussiness: product.isBussiness,
        itemAddMore: [],
      });
      index = products.length - 1;
    }
    if (product.idProductAdd)
      products[index].itemAddMore.push({
        id: product.idProductAdd,
        name: product.nameProductAdd,
        currentPrice: formatter.format(product.currentPriceProductAdd),
        image: product.imageProductAdd,
        isExit: product.isExitProductAdd,
        isBussiness: product.isBussinessProductAdd,
      });
  });

  return products;
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
    "SELECT idProductAdd, products.* FROM itemAddMore JOIN products on products.id = itemAddMore.idProductAdd WHERE idProduct = ?",
    [id]
  );
  return row;
};
const getFullProduct = async () => {
  const [row, fields] = await pool.execute(
    "SELECT * FROM products left join itemAddMore on products.id = itemAddMore.idProduct left join categories on products.idCategory = categories.id"
  );
  return row;
};

// const getItemAddMoreFromProductlist = async (productList) => {
//   console.log(productList);
//   productList.forEach((product) => {
//     console.log(product);
//   });
// };
const isProductDelete = async (id) => {
  const [row, fields] = await pool.execute(
    "SELECT idProduct FROM orderDetail WHERE idProduct = ?",
    [id]
  );
  if (row.length > 0) {
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

const getLimitedProduct = async (filter = null) => {
  let query =
    "SELECT products.*, categories.id AS idCategory, categories.name AS nameCategory, \
  productAdd.id AS idProductAdd, productAdd.name AS nameProductAdd, \
  productAdd.currentPrice AS currentPriceProductAdd, productAdd.image AS imageProductAdd, \
  productAdd.isExit AS isExitProductAdd, productAdd.isBussiness AS isBussinessProductAdd \
  FROM products \
  LEFT JOIN categories ON categories.id = products.idCategory \
  LEFT JOIN itemAddMore ON products.id = itemAddMore.idProduct \
  LEFT JOIN products AS productAdd ON productAdd.id = itemAddMore.idProductAdd \
  ORDER BY products.sold DESC \
  LIMIT 4";
  if (filter) {
    query += ` WHERE products.name LIKE '%${filter}%' OR categories.id LIKE '%${filter}%'`;
  }
  const [row, fields] = await pool.execute(query);
  let products = [];
  row.forEach((product) => {
    let index = products.findIndex((item) => item.id === product.id);
    if (index === -1) {
      products.push({
        id: product.id,
        name: product.name,
        currentPrice: formatter.format(product.currentPrice),
        description: product.description,
        image: product.image,
        idCategory: product.idCategory,
        nameCategory: product.nameCategory,
        itemAddMore: [],
      });
      index = products.length - 1;
    }
    if (product.idProductAdd)
      products[index].itemAddMore.push({
        id: product.idProductAdd,
        name: product.nameProductAdd,
        currentPrice: formatter.format(product.currentPriceProductAdd),
        image: product.imageProductAdd,
        isExit: product.isExitProductAdd,
        isBussiness: product.isBussinessProductAdd,
      });
  });

  return products;
};
const updateStatusProduct = async (id, field, status) => {
  const [row] = await pool.execute(
    `UPDATE products SET ${field} = ? WHERE id = ?`,
    [status, id]
  );
  return row;
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
  getFullProduct,
  getLimitedProduct,
  updateStatusProduct,
};
