const { ObjectId } = require('mongodb');
const connectDB = require('../config/db');

async function getCollection() {
  const db = await connectDB();
  return db.collection('products');
}

async function getAllProducts() {
  const collection = await getCollection();
  return collection.find().toArray();
}

async function getProductById(id) {
  const collection = await getCollection();
  return collection.findOne({ _id: new ObjectId(id) });
}

module.exports = {
  getAllProducts,
  getProductById,
};