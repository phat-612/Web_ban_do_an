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
const login = async (userData) => {
  const { email, password } = userData;
  console.log(userData);
  const [users] = await pool.execute("SELECT * FROM `users` WHERE email = ?", [
    email,
  ]);

  if (users.length === 0) {
    return null;
  }

  const user = users[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    return user;
  } else {
    return null;
  }
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

const apiRegister = async (data) => {
  const { name, email, phone, password, date, sex } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [row] = await pool.execute(
    "INSERT INTO `users` (`name`, `email`, `phone`, `password`, `date`,`sex`) VALUES (?, ?, ?, ?, ?,?)",
    [name, email, phone, hashedPassword, date, sex]
  );

  return row;
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
};
