import express from "express";
import path from "path";
import dotenv from "dotenv";

import viewEngine from "./config/viewEngine";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// cấu hình viewEngine
viewEngine(app);

app.get("/", (req, res) => {
  res.render("user/home", { title: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
