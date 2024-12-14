import pool from "../config/db";
const getInfoShop = async () => {
  const [row, field] = await pool.execute("SELECT * FROM shopInfo");
  return row;
};
const updateInfoShop = async (data) => {
  const [row, field] = await pool.execute(
    "UPDATE shopInfo SET name=?, phone=?, taxCode=?, email=?, address=?, activeTime=?, idEditor=?",
    [
      data.name,
      data.phone,
      data.taxCode,
      data.email,
      data.address,
      data.activeTime,
      data.idEditor,
    ]
  );
};
export default { getInfoShop, updateInfoShop };
