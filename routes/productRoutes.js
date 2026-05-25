const express = require("express");

const router = express.Router();

const Product = require("../models/Product");


// ADD PRODUCT

router.post("/add", async (req, res) => {

  try {

    const product = await Product.create(req.body);

    res.json(product);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});


// GET PRODUCTS

router.get("/", async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;