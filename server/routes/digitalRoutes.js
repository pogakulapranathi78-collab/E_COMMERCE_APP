const express = require("express");
const router = express.Router();

// GET DIGITAL PRODUCTS FROM INTERNET API
router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;