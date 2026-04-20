const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');

async function placeOrder(req, res) {
  try {
    const { userEmail, items, totalAmount, paymentIntentId } = req.body;

    if (!userEmail || !items || items.length === 0) {
      return res.status(400).send({ error: 'Invalid order data' });
    }

    const orderData = {
      userEmail,
      items,
      totalAmount,
      paymentIntentId,
      paymentStatus: 'paid',
      orderStatus: 'pending',
      createdAt: new Date(),
    };

    const result = await orderModel.createOrder(orderData);

    // 🔥 clear only this user's cart (we will fix cart next)
    await cartModel.clearCartByEmail(userEmail);

    res.send({
      message: 'Order placed successfully',
      result,
    });

  } catch (error) {
    console.error('POST /orders error:', error);
    res.status(500).send({ error: 'Failed to place order' });
  }
}

async function getMyOrders(req, res) {
  try {
    const email = req.params.email;
    const orders = await orderModel.getOrdersByEmail(email);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch orders' });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await orderModel.getAllOrders();
    res.send(orders);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch orders' });
  }
}

async function updateStatus(req, res) {
  try {
    const { status } = req.body;
    const result = await orderModel.updateOrderStatus(req.params.id, status);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update status' });
  }
}

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateStatus,
};