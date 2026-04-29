// const express = require('express');
// const router = express.Router();

// const {
//   placeOrder,
//   getMyOrders,
//   getAllOrders,
//   updateStatus,
// } = require('../controllers/orderController');

// router.post('/', placeOrder);
// router.get('/:email', getMyOrders);
// router.get('/', getAllOrders);
// router.put('/:id', updateStatus);

// module.exports = router;

// v2 for cod 
const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateStatus,
  updatePaymentStatus,
} = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/', getAllOrders);
router.get('/:email', getMyOrders);
router.put('/:id', updateStatus);
router.patch('/:id/payment-status', updatePaymentStatus);

module.exports = router;