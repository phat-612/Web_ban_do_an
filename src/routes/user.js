import express from "express";

const router = express.Router();

// Controller functions (you need to implement these)

// Routes
router.get("/", (req, res) => {
  res.render("user/home", { title: "Hello World!" });
});

module.exports = router;
