const cartModel = require('../models/cartModel');

async function createCartItem(req, res) {
  try {
    const cartItem = req.body;

    if (!cartItem || Object.keys(cartItem).length === 0) {
      return res.status(400).send({ error: 'Cart item data is required' });
    }

    const result = await cartModel.addCartItem(cartItem);
    res.send(result);
  } catch (error) {
    console.error('POST /cart error:', error);
    res.status(500).send({ error: 'Failed to add item to cart' });
  }
}

async function getCartItems(req, res) {
  try {
    const result = await cartModel.getAllCartItems();
    res.send(result);
  } catch (error) {
    console.error('GET /cart error:', error);
    res.status(500).send({ error: 'Failed to fetch cart items' });
  }
}

async function removeCartItem(req, res) {
  try {
    const result = await cartModel.deleteCartItem(req.params.id);
    res.send(result);
  } catch (error) {
    console.error('DELETE /cart/:id error:', error);
    res.status(500).send({ error: 'Failed to delete cart item' });
  }
}

async function removeAllCartItems(req, res) {
  try {
    const result = await cartModel.clearCart();
    res.send(result);
  } catch (error) {
    console.error('DELETE /cart error:', error);
    res.status(500).send({ error: 'Failed to clear cart' });
  }
}

async function updateCartQuantity(req, res) {
  try {
    const { quantity } = req.body;
    const result = await cartModel.updateCartItemQuantity(req.params.id, quantity);
    res.send(result);
  } catch (error) {
    console.error('PUT /cart/:id error:', error);
    res.status(500).send({ error: 'Failed to update cart item' });
  }
}

module.exports = {
  createCartItem,
  getCartItems,
  removeCartItem,
  removeAllCartItems,
  updateCartQuantity,
};