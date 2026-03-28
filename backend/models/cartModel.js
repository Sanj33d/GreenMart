const { ObjectId } = require('mongodb');
const connectDB = require('../config/db');

async function getCollection() {
  const db = await connectDB();
  return db.collection('cart');
}

async function addCartItem(cartItem) {
  const collection = await getCollection();
  return collection.insertOne(cartItem);
}

async function getAllCartItems() {
  const collection = await getCollection();
  return collection.find().toArray();
}

async function deleteCartItem(id) {
  const collection = await getCollection();
  return collection.deleteOne({ _id: new ObjectId(id) });
}

async function clearCart() {
  const collection = await getCollection();
  return collection.deleteMany({});
}

async function updateCartItemQuantity(id, quantity) {
  const collection = await getCollection();
  return collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { quantity } }
  );
}

module.exports = {
  addCartItem,
  getAllCartItems,
  deleteCartItem,
  clearCart,
  updateCartItemQuantity,
};