// const connectDB = require('../config/db');

// async function getCollection() {
//   const db = await connectDB();
//   return db.collection('orders');
// }

// async function createOrder(orderData) {
//   const collection = await getCollection();
//   return collection.insertOne(orderData);
// }

// async function getOrdersByEmail(email) {
//   const collection = await getCollection();
//   return collection.find({ userEmail: email }).toArray();
// }

// async function getAllOrders() {
//   const collection = await getCollection();
//   return collection.find().toArray();
// }

// async function updateOrderStatus(id, status) {
//   const { ObjectId } = require('mongodb');
//   const collection = await getCollection();

//   return collection.updateOne(
//     { _id: new ObjectId(id) },
//     { $set: { orderStatus: status } }
//   );
// }

// module.exports = {
//   createOrder,
//   getOrdersByEmail,
//   getAllOrders,
//   updateOrderStatus,
// };

// v2 for cash on delivery
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
  return collection.find({ userEmail: email }).sort({ createdAt: -1 }).toArray();
}

async function getAllOrders() {
  const collection = await getCollection();
  return collection.find().sort({ createdAt: -1 }).toArray();
}

async function updateOrderStatus(id, status) {
  const { ObjectId } = require('mongodb');
  const collection = await getCollection();

  return collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { orderStatus: status } }
  );
}

// updatePaymentStatus v1
// async function updatePaymentStatus(id, paymentStatus, failureReason = '') {
//   const { ObjectId } = require('mongodb');
//   const collection = await getCollection();

//   return collection.updateOne(
//     { _id: new ObjectId(id) },
//     {
//       $set: {
//         paymentStatus,
//         failureReason,
//         updatedAt: new Date(),
//       },
//     }
//   );
// }

// updatePaymentStatus v2
async function updatePaymentStatus(id, paymentStatus, failureReason = '', paymentIntentId = null) {
  const { ObjectId } = require('mongodb');
  const collection = await getCollection();

  const updateData = {
    paymentStatus,
    failureReason,
    updatedAt: new Date(),
  };

  if (paymentIntentId) {
    updateData.paymentIntentId = paymentIntentId;
  }

  return collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
}

module.exports = {
  createOrder,
  getOrdersByEmail,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
};