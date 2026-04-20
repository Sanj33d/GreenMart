const connectDB = require('../config/db');

async function getCollection() {
  const db = await connectDB();
  return db.collection('orders');
}

async function createOrder(orderData) {
  const collection = await getCollection();
  return collection.insertOne(orderData);
}

async function getOrdersByEmail(email) {
  const collection = await getCollection();
  return collection.find({ userEmail: email }).toArray();
}

async function getAllOrders() {
  const collection = await getCollection();
  return collection.find().toArray();
}

async function updateOrderStatus(id, status) {
  const { ObjectId } = require('mongodb');
  const collection = await getCollection();

  return collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { orderStatus: status } }
  );
}

module.exports = {
  createOrder,
  getOrdersByEmail,
  getAllOrders,
  updateOrderStatus,
};