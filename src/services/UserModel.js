import pool from "../config/db";
import bcrypt from "bcrypt";

const getAllUser = async () => {
  const [row, field] = await pool.execute("SELECT * FROM`users`");
  return row;
};
const updateStatus = async (idUser, status) => {
  const [row, field] = await pool.execute(
    "UPDATE `users` SET `status` = ? WHERE `id` = ?",
    [status, idUser]
  );
  return row;
};
const findUserEmail = async (email) => {
  const [row] = await pool.execute("SELECT * FROM `users` WHERE `email` =?", [
    email,
  ]);
  return row[0];
};
const updateRole = async (idUser, role) => {
  const [row, field] = await pool.execute(
    "UPDATE `users` SET `role` = ? WHERE `id` = ?",
    [role, idUser]
  );
  return row;
};

const findUserByEmail = async (email) => {
  const stringQuery = `%${email}%`;
  const [row, field] = await pool.execute(
    "SELECT * FROM `users` WHERE `email` LIKE ?",
    [stringQuery]
  );
  return row;
};
// login
const login = async (email) => {
  const [users] = await pool.execute("SELECT * FROM `users` WHERE email = ?", [
    email,
  ]);
  return users[0] || null;
};

// userModel.js
const userProfile = async (userId) => {
  const [rows] = await pool.execute("SELECT * FROM `users` WHERE id = ?", [
    userId,
  ]);
  return rows;
};

const sendFeedback = async (data) => {
  const [row, field] = await pool.execute(
    "INSERT INTO `feedbacks` (`name`, `email`, `title`, `content`) VALUES (?,?,?,?)",
    [data.name, data.email, data.title, data.content]
  );
  return row;
};
// đăng ký
const apiRegister = async (data) => {
  const { name, email, phone, password, date, sex } = data;

  const [row] = await pool.execute(
    "INSERT INTO `users` (`name`, `email`, `phone`, `password`, `date`,`sex`) VALUES (?, ?, ?, ?, ?,?)",
    [name, email, phone, password, date, sex]
  );
  return row[0];
};
const editProfile = async (id, data) => {
  const { name, email, phone, date, sex } = data;

  const [row, field] = await pool.execute(
    "UPDATE `users` SET `name` =?, `email` =?, `phone` =?, `sex` =?, `date` =? WHERE `id` =?",
    [name, email, phone, sex, date, id]
  );

  return row;
};
// thêm địa chỉ
const address = async (data, idUser) => {
  const { name, phone, address } = data;
  const [rows] = await pool.execute(
    "INSERT INTO `addresses` (`idUser`, `name`,`phone`,`address`) VALUES(?,?,?,?)",
    [idUser, name, phone, address]
  );
  return rows;
};
// danh sách địa chỉ
const getAllAddress = async (idUser) => {
  const [rows] = await pool.execute(
    "SELECT * FROM `addresses` WHERE `idUser` =?",
    [idUser]
  );
  return rows;
};
// xóa địa chỉ mặc định
const setDefaultAddress = async (idUser) => {
  const [row, field] = await pool.execute(
    "UPDATE `addresses` SET `isDefault` = false",
    [idUser]
  );
  return row;
};
// sửa địa chỉ
const editAddress = async (idAddress, data) => {
  const { name, phone, address } = data;
  const [row, field] = await pool.execute(
    "UPDATE `addresses` SET `name` =?, `phone` =?, `address` =? WHERE `id` =?",
    [name, phone, address, idAddress]
  );
  return row;
};
// xóa địa chỉ
const deleteAddress = async (idAddress, userId) => {
  const [row, field] = await pool.execute(
    "DELETE FROM `addresses` WHERE `id` =? AND `idUser` =?",
    [idAddress, userId]
  );
  return row;
};
// đặt địa chỉ mặc định
const defaultAddress = async (idAddress, userId) => {
  const [row, field] = await pool.execute(
    "UPDATE `addresses` SET `isDefault` = true WHERE `id` =? AND `idUser` =?",
    [idAddress, userId]
  );
  return row;
};
// lịch sử đơn hàng
const getAllOrder = async (idUser) => {
  const [rows] = await pool.execute(
    "SELECT * FROM `orders` WHERE `idUser` =?",
    [idUser]
  );
  return rows;
};
// sản phẩm trong đơn hàng
const getAllOrderDetail = async (idOrder) => {
  const [rows] = await pool.execute(
    "SELECT * FROM `orderDetail` WHERE `idOrder` =?",
    [idOrder]
  );
  return rows;
};

//đặt lại mật khẩu
const resetPassword = async (email, id) => {
  const [row, field] = await pool.execute(
    "SELECT * FROM `users` WHERE `email` =? AND `id` =?",
    [email, id]
  );
  return row[0];
};
const updatePassword = async (id, password) => {
  const [row, field] = await pool.execute(
    "UPDATE `users` SET `password` =? WHERE `id` =?",
    [password, id]
  );
  return row[0];
};
// hủy tài khoản
const cancelAccount = async (id) => {
  const [row, field] = await pool.execute(
    "UPDATE `users` SET `status` = 3 WHERE `id` =?",
    [id]
  );
  return row[0];
};
// hủy đơn hàng
const cancelOrder = async (idOrder) => {
  const [row, field] = await pool.execute(
    "DELETE FROM `orders` WHERE `id` =?",
    [idOrder]
  );
  return row[0];
};
// hủy sản phẩm trong đơn hàng
const cancelOrderDetail = async (idOrder) => {
  const [row, field] = await pool.execute(
    "UPDATE `orders` SET `status` = 6 WHERE `id` = ?",
    [idOrder]
  );
  return row;
};
export default {
  getAllUser,
  updateStatus,
  updateRole,
  findUserByEmail,
  login,
  sendFeedback,
  userProfile,
  apiRegister,
  editProfile,
  address,
  getAllAddress,
  setDefaultAddress,
  defaultAddress,
  editAddress,
  deleteAddress,
  resetPassword,
  updatePassword,
  cancelAccount,
  getAllOrder,
  getAllOrderDetail,
  cancelOrder,
  cancelOrderDetail,
  findUserEmail,
};
