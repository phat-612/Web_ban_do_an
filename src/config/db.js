import mysql from "mysql2";
const pool = mysql.createPool({
  host: "g2u23.h.filess.io",
  user: "webBanDoAn_teapoormen",
  database: "webBanDoAn_teapoormen",
  password: "e03711447cf37beadd274623ffb54f3863709bab",
  port: "3306",
});
const connection = pool.promise();
export default connection;
