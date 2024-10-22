import pool from "../config/db";

const getAllCategory = async (req, res) => {
  const [rows, field] = await pool.execute("SELECT * FROM `category`");
  return rows;
};

// api

const addCategory = async (nameCategory) => {
  console.log(nameCategory);
  const [row, field] = await pool.execute(
    "INSERT INTO `category` (`name`) VALUES (?)",
    [nameCategory]
  );
  return row;
};

export default { addCategory, getAllCategory };
