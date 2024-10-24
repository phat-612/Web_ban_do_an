import pool from "../config/db";
const getAllUser = async () => {
  const [row, field] = await pool.execute("SELECT * FROM`users`");
  return row;
};
export default { getAllUser };
