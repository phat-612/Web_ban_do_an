import pool from "../config/db";

const getAllOrderFull = async () => {
  const [rows, fields] = await pool.execute(
    "SELECT od.id, od.created_at, od.name, od.phone,od.name AS customerName , od.address, od.total, od.status, dt.quantity, dt.price,pr.id as idProduct, pr.name, pr.sold ,pr.image, pr.currentPrice, pr.description FROM orders od JOIN orderDetail dt ON od.id = dt.idOrder JOIN products pr ON dt.idProduct = pr.id"
  );
  return rows;
};
const getAllOrderFullById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT od.id, od.created_at, od.name, od.phone,od.name AS customerName , od.address, od.total, od.status, dt.quantity, dt.price,pr.id as idProduct, pr.name, pr.sold ,pr.image, pr.currentPrice, pr.description FROM orders od JOIN orderDetail dt ON od.id = dt.idOrder JOIN products pr ON dt.idProduct = pr.id WHERE od.id=?",
    [id]
  );
  return rows[0];
};
const getAllOrderFullByIdUser = async (id) => {
  const [rows, fields] = await pool.execute(
    "SELECT od.id, od.created_at, od.name, od.phone,od.name AS customerName , od.address, od.total, od.status, dt.quantity, dt.price,pr.id as idProduct, pr.name, pr.sold ,pr.image, pr.currentPrice, pr.description FROM orders od JOIN orderDetail dt ON od.id = dt.idOrder JOIN products pr ON dt.idProduct = pr.id WHERE od.idUser=?",
    [id]
  );
  return rows;
};
const updateSold = async (quantity, id) => {
  try {
    await pool.query("UPDATE `products` SET sold = sold + ? WHERE id = ?", [
      quantity,
      id,
    ]);
  } catch (error) {
    console.error("Lỗi khi cập nhật số lượng bán:", error);
    throw new Error("Không thể cập nhật số lượng bán.");
  }
};

const getOrders = async (id) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `orders` WHERE `id` = ?",
    [id]
  );
  return rows[0];
};
const addOrder = async (order, orderDetail) => {
  // thêm sản dữ liệu vào bảng orders
  const [rows, fields] = await pool.execute(
    "INSERT INTO `orders` (`idUser`, `name`, `phone`, `address`, `note`, `total`, `status` ) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      order.idUser,
      order.name,
      order.phone,
      order.address,
      order.note,
      order.total,
      order.status,
    ]
  );
  const idOrder = rows.insertId;
  // console.log("idOrder", idOrder);
  // thêm dữ liệu vào bảng orderDetail
  if (orderDetail) {
    const values = orderDetail.map((item) => [idOrder, ...item]);
    await pool.query(
      "INSERT INTO `orderDetail` (`idOrder`, `idProduct`, `quantity`, `price`) VALUES ?",
      [values]
    );
  }
  // xóa sản phẩm đã đặt trong giỏ hàng người dùng
  await pool.execute("DELETE FROM `carts` WHERE `idUser` = ? AND isBuy=1", [
    order.idUser,
  ]);
  return;
};
const updateStatusOrder = async (status, id) => {
  const [rows, fields] = await pool.execute(
    "UPDATE `orders` SET `status` = ? WHERE `id` = ?",
    [status, id]
  );
  return rows;
};
const restoreOrder = async (id) => {
  const [rows, fields] = await pool.execute(
    "UPDATE `orders` SET `status` = 1 WHERE `status` = 6 AND `id` = ?",
    [id]
  );
  return rows;
};

// FOR DELIVERY

const getOrdersByStatusPedding = async () => {
  const [rows, fields] = await pool.execute(
    `SELECT 
    o.id AS order_id,
    o.idUser,
    o.name AS customer_name,
    o.phone,
    o.address,
    o.note,
    o.total,
    o.status,
    o.created_at AS order_created_at,
    od.id AS order_detail_id,
    od.quantity,
    od.price,
    od.created_at AS order_detail_created_at,
    p.id AS product_id,
    p.name AS product_name,
    p.currentPrice,
    p.description,
    p.image
FROM orders o
JOIN orderDetail od ON o.id = od.idOrder
JOIN products p ON od.idProduct = p.id
WHERE o.status = 3;
`
  );
  console.log(rows[0]);
  return rows;
};

export default {
  getAllOrderFull,
  addOrder,
  getOrders,
  updateStatusOrder,
  restoreOrder,
  updateSold,
  getAllOrderFullById,
  getAllOrderFullByIdUser,
  // FOR DELIVERY
  getOrdersByStatusPedding,
};
