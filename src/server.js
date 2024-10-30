import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import RedisStore from "connect-redis";
import redisClient from "./config/redis";
import session from "express-session";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./routes/index";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.get("/check-session", (req, res) => {
  if (req.session.user && req.session.user.isLoggedIn) {
    res.send(`Session tồn tại. Xin chào, ${req.session.user.role}`);
  } else {
    res
      .status(401)
      .send("Session không tồn tại hoặc người dùng chưa đăng nhập");
  }
});

viewEngine(app);
initWebRouter(app);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
