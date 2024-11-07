import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import RedisStore from "connect-redis";
import redisClient from "./config/redis";
import session from "express-session";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./routes/index";
import firebase from "firebase/app";
import "firebase/auth";
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
firebase.initializeApp({
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
});
const sendOTP = (phoneNumber) => {
  const appVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult; // Lưu để xác thực OTP sau
    })
    .catch((error) => {
      console.error("Lỗi khi gửi OTP:", error);
    });
};
viewEngine(app);
initWebRouter(app);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
