const express = require('express');
const router = express.Router();

const {
  createCartItem,
  getCartItems,
  removeCartItem,
  removeAllCartItems,
  updateCartQuantity,
} = require('../controllers/cartController');

router.post('/', createCartItem);
router.get('/', getCartItems);
router.delete('/:id', removeCartItem);
router.delete('/', removeAllCartItems);
router.put('/:id', updateCartQuantity);

module.exports = router;