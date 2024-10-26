import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// import session from "express-session";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./routes/index";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// cấu hình viewEngine
viewEngine(app);
initWebRouter(app);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
