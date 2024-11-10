import pool from "../config/db";

const getAllOrderFull = async (orderId) => {
  const [rows, fields] = await pool.execute(
    "SELECT od.id, od.created_at, od.name, od.phone, od.address, od.total, od.status, dt.quantity, dt.price, p.name, p.currentPrice, p.description FROM orders od JOIN orderDetail dt ON od.id = dt.idOrder JOIN products p ON dt.idProduct = p.id WHERE od.id = ?",
    [orderId]
  );
  return rows;
};
const getOrders = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `orders`");
  return rows;
};
const addOrder = async (order, orderDetail) => {
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

  if (orderDetail) {
    const values = orderDetail.map((item) => [idOrder, ...item]);
    await pool.query(
      "INSERT INTO `orderDetail` (`idOrder`, `idProduct`, `quantity`, `price`) VALUES ?",
      [values]
    );
  }

  return;
};
const updateStatus = async (status) => {
  const [rows, fields] = await pool.execute(
    "UPDATE `orders` SET `status` WHERE `status` = ?",
    [status]
  );
  return rows;
};

export default { getAllOrderFull, addOrder, getOrders, updateStatus };
