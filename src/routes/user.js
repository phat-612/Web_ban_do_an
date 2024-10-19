import express from "express";

const router = express.Router();

// Controller functions (you need to implement these)

// Routes
router.get("/", (req, res) => {
  res.render("main", {
    data: {
      title: "Home",
      header: "partials/headerUser",
      page: "user/home",
    },
  });
});

export default router;
