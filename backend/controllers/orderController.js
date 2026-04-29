// const orderModel = require('../models/orderModel');
// const cartModel = require('../models/cartModel');

// async function placeOrder(req, res) {
//   try {
//     const { userEmail, items, totalAmount, paymentIntentId, shippingInfo } = req.body;

//     if (!userEmail || !items || items.length === 0) {
//       return res.status(400).send({ error: 'Invalid order data' });
//     }

//     const orderData = {
//       userEmail,
//       items,
//       totalAmount,
//       paymentIntentId,
//         shippingInfo,
//       paymentStatus: 'paid',
//       orderStatus: 'pending',
//       createdAt: new Date(),
//     };

//     const result = await orderModel.createOrder(orderData);

//     //clear only this user's cart
//     await cartModel.clearCartByEmail(userEmail);

//     res.send({
//       message: 'Order placed successfully',
//       result,
//     });

//   } catch (error) {
//     console.error('POST /orders error:', error);
//     res.status(500).send({ error: 'Failed to place order' });
//   }
// }

// async function getMyOrders(req, res) {
//   try {
//     const email = req.params.email;
//     const orders = await orderModel.getOrdersByEmail(email);
//     res.send(orders);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to fetch orders' });
//   }
// }

// async function getAllOrders(req, res) {
//   try {
//     const orders = await orderModel.getAllOrders();
//     res.send(orders);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to fetch orders' });
//   }
// }

// async function updateStatus(req, res) {
//   try {
//     const { status } = req.body;
//     const result = await orderModel.updateOrderStatus(req.params.id, status);
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to update status' });
//   }
// }

// module.exports = {
//   placeOrder,
//   getMyOrders,
//   getAllOrders,
//   updateStatus,
// };

// v2 for cod
const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');

async function placeOrder(req, res) {
  try {
    const {
      userEmail,
      items,
      totalAmount,
      paymentIntentId,
      shippingInfo,
      paymentMethod,
      paymentStatus,
      failureReason,
    } = req.body;

    if (!userEmail || !items || items.length === 0) {
      return res.status(400).send({ error: 'Invalid order data' });
    }

    const finalPaymentMethod = paymentMethod || 'card';

    const orderData = {
      userEmail,
      items,
      totalAmount,
      paymentIntentId: paymentIntentId || null,
      shippingInfo,
      paymentMethod: finalPaymentMethod,
      paymentStatus:
        paymentStatus || (finalPaymentMethod === 'cod' ? 'cash_on_delivery' : 'pending'),
      failureReason: failureReason || '',
      orderStatus: 'pending',
      createdAt: new Date(),
    };

    const result = await orderModel.createOrder(orderData);

    if (
      orderData.paymentStatus === 'paid' ||
      orderData.paymentStatus === 'cash_on_delivery'
    ) {
      await cartModel.clearCartByEmail(userEmail);
    }

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

// updatePaymentStatus v1
// async function updatePaymentStatus(req, res) {
//   try {
//     const { paymentStatus, failureReason } = req.body;

//     if (!paymentStatus) {
//       return res.status(400).send({ error: 'paymentStatus is required' });
//     }

//     const result = await orderModel.updatePaymentStatus(
//       req.params.id,
//       paymentStatus,
//       failureReason
//     );

//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to update payment status' });
//   }
// }

// updatePaymentStatus v2
async function updatePaymentStatus(req, res) {
  try {
    const { paymentStatus, failureReason, paymentIntentId } = req.body;

    if (!paymentStatus) {
      return res.status(400).send({ error: 'paymentStatus is required' });
    }

    const result = await orderModel.updatePaymentStatus(
      req.params.id,
      paymentStatus,
      failureReason,
      paymentIntentId
    );

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update payment status' });
  }
}

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateStatus,
  updatePaymentStatus,
};