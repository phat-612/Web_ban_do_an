import pool from "../config/db";

const getAllBanner = async function () {
  const [rows] = await pool.execute("SELECT * FROM `banner`");
  return rows;
};

const addBanner = async function (data) {
  const [row] = await pool.execute(
    "INSERT INTO `banners` (`image`,`link`) VALUES (?,?)",
    [data.image, data.link]
  );
};
export default { addBanner, getAllBanner };
