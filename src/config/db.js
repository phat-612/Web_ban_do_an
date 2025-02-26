import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
});

const connection = pool.promise();
// connection.query("SELECT 1", (err, results) => {
//   if (err) {
//     console.error("Database connection failed:", err.stack);
//   } else {
//     console.log("Database connection successful:", results);
//   }
// });
export default connection;
