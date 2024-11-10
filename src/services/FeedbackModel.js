import pool from "../config/db";
const getAllFeedback = async () => {
  const [row] = await pool.execute("SELECT * FROM `feedbacks`");
  return row;
};
const getTopNewFeedback = async () => {
  const [row] = await pool.execute(
    "SELECT * FROM `feedbacks` ORDER BY `created_at` DESC LIMIT 10"
  );
  return row;
};
export default { getAllFeedback, getTopNewFeedback };
