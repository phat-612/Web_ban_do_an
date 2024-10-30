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

// fsdfsfsfs

export default {
  getAllUser,
  updateStatus,
  updateRole,
  findUserByEmail,
  login,
  sendFeedback,
  userProfile,
  apiRegister,
};
