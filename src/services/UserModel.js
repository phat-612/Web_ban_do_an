import pool from "../config/db";
const getAllUser = async () => {
  const [row, field] = await pool.execute("SELECT * FROM`users`");
  return row;
};
const login = async (userData) => {
  const { email, password } = userData;

  const [row] = await pool.execute(
    "SELECT * FROM `users` WHERE email = ? AND password = ?",
    [email, password]
  );
  return row;
};
const sendFeedback = async (data) => {
  const [row, field] = await pool.execute(
    "INSERT INTO `feedbacks` (`name`, `email`, `title`, `content`) VALUES (?,?,?,?)",
    [data.name, data.email, data.title, data.content]
  );
  return row;
};

// fsdfsfsfs

export default { getAllUser, login, sendFeedback };
