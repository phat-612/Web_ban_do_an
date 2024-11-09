import pool from "../config/db";

const getAllOrder = async (req, res, next) => {};
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

export default { getAllOrder, addOrder };
