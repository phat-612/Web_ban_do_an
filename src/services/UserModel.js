import pool from "../config/db";
const getAllUser = async () => {
  const [row, field] = await pool.execute("SELECT * FROM`users`");
  return row;
};
const login = async (userData) => {
  const { email, password } = userData;

  try {
    const [row] = await pool.execute(
      "SELECT * FROM `users` WHERE email = ? AND password = ?",
      [email, password]
    );

    if (row.length === 0) {
      throw new Error("Invalid email or password");
    }

    console.log(row);
    return row;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error("Database query failed"); // Hoặc xử lý lỗi theo cách khác
  }
};

export default { getAllUser, login };
