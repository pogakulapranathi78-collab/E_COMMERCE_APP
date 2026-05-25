const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const auth = require("../middleware/auth");


// ADD TO CART
router.post("/add", auth, async (req, res) => {

  try {

    const item = new Cart({
      userId: req.user.id,
      productId: req.body.productId,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity
    });

    await item.save();

    res.json(item);

  } catch (err) {
    res.status(500).json(err);
  }

});


// GET CART
router.get("/", auth, async (req, res) => {

  try {

    const cart = await Cart.find({ userId: req.user.id });

    res.json(cart);

  } catch (err) {
    res.status(500).json(err);
  }

});


// DELETE ITEM
router.delete("/:id", auth, async (req, res) => {

  try {

    await Cart.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.json({ message: "Item removed" });

  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;