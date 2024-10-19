import express from "express";
import path from "path";
import dotenv from "dotenv";

import viewEngine from "./config/viewEngine";
import initWebRouter from "./routes/index";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// cấu hình viewEngine
viewEngine(app);
initWebRouter(app);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
