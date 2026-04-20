const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateStatus,
} = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/:email', getMyOrders);
router.get('/', getAllOrders);
router.put('/:id', updateStatus);

module.exports = router;