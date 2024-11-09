import pool from "../config/db";
const getAllFeedback = async () => {
  const [row] = await pool.execute("SELECT * FROM `feedbacks`");
  return row;
};
export default { getAllFeedback };
