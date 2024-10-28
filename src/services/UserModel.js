import pool from "../config/db";
import bcrypt from "bcrypt";

const getAllUser = async () => {
  const [row, field] = await pool.execute("SELECT * FROM`users`");
  return row;
};
// login
const login = async (userData) => {
  // return console.log(req.body);

  const { email, password } = userData;

  const [users] = await pool.execute("SELECT * FROM `users` WHERE email = ?", [
    email,
  ]);

  if (users.length === 0) {
    return null; // Không tìm thấy người dùng với email đã nhập
  }

  const user = users[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    return user;
  } else {
    return null;
  }
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
    [name, email, phone, hashedPassword, date]
  );

  return row;
};

// fsdfsfsfs

export default { getAllUser, login, sendFeedback, userProfile, apiRegister };
