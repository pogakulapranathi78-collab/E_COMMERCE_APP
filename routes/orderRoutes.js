const express = require("express");
const router = express.Router();

const Order = require("../models/Order");


// PLACE ORDER (Checkout)
router.post("/place", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = await Order.create({
      items,
      totalAmount
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// UPDATE ORDER STATUS
router.put("/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;