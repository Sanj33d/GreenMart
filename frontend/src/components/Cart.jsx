import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext/CartContext';
import { NavLink } from 'react-router';

const Cart = () => {
    // const [cartItems, setCartItems] = useState([]);
    const { cartItems, setCartItems, loadCartItems, handleRemoveFromCart, handleClearCart } = useContext(CartContext);

    

  return (
    <div className="m-6">
      <h2 className="text-3xl font-bold mb-4">My Cart</h2>

      <div className="grid grid-cols-1 gap-4">
        {cartItems.map(item => (
          <div key={item._id} className="card bg-base-100 shadow-md p-4">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>Brand: {item.brand}</p>
                <p>Category: {item.category}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>

              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="btn btn-error text-white"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className='btn btn-primary' onClick={handleClearCart}>
        Clear Cart
      </button>

      <NavLink to="/checkout" className="btn btn-success m-4 ">
        Proceed to Checkout
      </NavLink>
    </div>
  )
}

export default Cart