const express = require("express");
const router = express.Router();

// ONLINE PRODUCT SEARCH (FAKE STORE API)
router.get("/", async (req, res) => {
  try {
    const q = req.query.q || "";

    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    const result = data.filter(p =>
      p.title.toLowerCase().includes(q.toLowerCase())
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;