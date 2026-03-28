const productModel = require('../models/productModel');

async function getProducts(req, res) {
  try {
    const products = await productModel.getAllProducts();
    res.send(products);
  } catch (error) {
    console.error('GET /products error:', error);
    res.status(500).send({ error: 'Failed to fetch products' });
  }
}

async function getSingleProduct(req, res) {
  try {
    const product = await productModel.getProductById(req.params.id);
    res.send(product);
  } catch (error) {
    console.error('GET /products/:id error:', error);
    res.status(500).send({ error: 'Failed to fetch product' });
  }
}

module.exports = {
  getProducts,
  getSingleProduct,
};