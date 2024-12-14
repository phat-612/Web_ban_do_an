import pool from "../config/db";

const getAllBanner = async function () {
  const [rows] = await pool.execute("SELECT * FROM `banners`");
  return rows;
};

const addBanner = async function (data) {
  const [row] = await pool.execute(
    "INSERT INTO `banners` (`image`,`link`, `idEditor`) VALUES (?,?,?)",
    [data.image, data.link, data.idEditor]
  );
};

const editBanner = async function (data) {
  await pool.execute(
    "UPDATE `banners` SET `image` = ?, `link` = ?, `idEditor` = ? WHERE `banners`.`id` = ?",
    [data.image, data.link, data.idEditor, data.id]
  );
};
const deletebanner = async function (id) {
  await pool.execute("DELETE FROM `banners` WHERE `banners`.`id` = ?", [id]);
};
export default { addBanner, getAllBanner, editBanner, deletebanner };
