const express = require("express");
const { ProdcutModel } = require("../model/ProductsModel");
const ProductRouter = express.Router();
const { Authorization } = require("../middlewares/Authorization");

ProductRouter.post("/", Authorization, (req, res) => {
  const payload = req.body;
  try {
    const Product = new ProdcutModel(payload);
    Product.save();
    res.status(201).json({
      msg: "Product Uploaded",
    });
  } catch (error) {
    console.log(error);
  }
});

ProductRouter.get("/filter", Authorization, async (req, res) => {
  const { category } = req.query;
  try {
    const allData = await ProdcutModel.find();
    let filterData = allData.filter((elem) => {
      return elem.category === category;
    });
    res.send(filterData);
  } catch (error) {
    console.log(error);
  }
});

ProductRouter.get("/sort", async (req, res) => {
  let { order } = req.query;
  try {
    const allData = await ProdcutModel.find();
    if ((order = "asc")) {
      const ascending = allData.sort((a, b) => {
        return a.date - b.date;
      });
      res.send(ascending);
    } else if ((order = "desc")) {
      const descending = allData.sort((a, b) => {
        return b.date - a.date;
      });
      res.send(descending);
    } else {
      const ascending = allData.sort((a, b) => {
        return a.date - b.date;
      });
      res.send(ascending);
    }
  } catch (error) {
    console.log(error);
  }
});

ProductRouter.get("/", Authorization, async (req, res) => {
  const { page, limit } = req.query;
  try {
    const allProduct = await ProdcutModel.find();
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;
    const paginatedProducts = allProduct.slice(startIndex, endIndex);
    res.json({
      totalItems: allProduct.length,
      currentPage: pageNumber,
      totalPages: Math.ceil(allProduct.length / limitNumber),
      products: paginatedProducts,
    });
  } catch (error) {
    console.log(error);
  }
});

ProductRouter.get("/search", async (req, res) => {
  const { name } = req.query;
  try {
    const allData = await ProdcutModel.find();
    console.log(allData);
    const filterData = allData.filter((elem) => {
      return elem.name === name;
    });
    res.json(filterData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { ProductRouter };
