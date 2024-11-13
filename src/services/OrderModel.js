import pool from "../config/db";

const getAllOrderFull = async () => {
  const [rows, fields] = await pool.execute(
    "SELECT od.id, od.created_at, od.name, od.phone,od.name AS customerName , od.address, od.total, od.status, dt.quantity, dt.price, pr.name,pr.image, pr.currentPrice, pr.description FROM orders od JOIN orderDetail dt ON od.id = dt.idOrder JOIN products pr ON dt.idProduct = pr.id"
  );
  return rows;
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
  console.log("idOrder", idOrder);
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

export default { getAllOrderFull, addOrder, getOrders, updateStatusOrder };
