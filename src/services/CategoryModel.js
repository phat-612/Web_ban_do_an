import pool from "../config/db";

const getAllCategory = async (req, res) => {
  const [rows, field] = await pool.execute("SELECT * FROM `category`");
  return rows;
};
const getCategoryByName = async (name) => {
  let findString = `%${name}%`;
  const [rows, field] = await pool.execute(
    "SELECT * FROM `category` WHERE `name` like ?",
    [findString]
  );
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
const deleteCategory = async (id) => {
  const [row, field] = await pool.execute(
    "DELETE FROM `category` WHERE `id` = ?",
    [id]
  );
  return row;
};

export default {
  addCategory,
  getAllCategory,
  deleteCategory,
  getCategoryByName,
};
