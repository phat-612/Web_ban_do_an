import pool from "../config/db";
import bcrypt from "bcrypt";

const getAllUser = async () => {
  const [row, field] = await pool.execute("SELECT * FROM`users`");
  return row;
};
const login = async (userData) => {
  const { email, password } = userData;

  const [row, field] = await pool.execute(
    "SELECT * FROM `users` WHERE email = ? AND password = ?",
    [email, password]
  );
  return row;
};
const userProfile = async () => {
  const [row, field] = await pool.execute("SELECT * FROM `users`");
  return row;
};
const sendFeedback = async (data) => {
  const [row, field] = await pool.execute(
    "INSERT INTO `feedbacks` (`name`, `email`, `title`, `content`) VALUES (?,?,?,?)",
    [data.name, data.email, data.title, data.content]
  );
  return row;
};

const apiRegister = async (data) => {
  const { name, email, phone, password, date } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [row] = await pool.execute(
    "INSERT INTO `users` (`name`, `email`, `phone`, `password`, `date`) VALUES (?, ?, ?, ?, ?)",
    [name, email, phone, hashedPassword, date] // Sử dụng mật khẩu đã mã hóa
  );

  return row;
};

// fsdfsfsfs

export default { getAllUser, login, sendFeedback, userProfile, apiRegister };
