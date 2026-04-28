// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useContext } from 'react';
// import { CartContext } from '../context/CartContext/CartContext';
// import { NavLink } from 'react-router';

// const Cart = () => {
//     // const [cartItems, setCartItems] = useState([]);
//     const { cartItems, setCartItems, loadCartItems, handleRemoveFromCart, handleClearCart } = useContext(CartContext);
//     const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

    

//   return (
//     <div className="m-6">
//       <h2 className="text-3xl font-bold mb-4">My Cart</h2>

//       <div className="grid grid-cols-1 gap-4">
//         {safeCartItems.map(item => (
//           <div key={item._id} className="card bg-base-100 shadow-md p-4">
//             <div className="flex items-center gap-4">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded"
//               />

//               <div className="flex-1">
//                 <h3 className="text-xl font-semibold">{item.name}</h3>
//                 <p>Brand: {item.brand}</p>
//                 <p>Category: {item.category}</p>
//                 <p>Price: ${item.price}</p>
//                 <p>Quantity: {item.quantity}</p>
//               </div>

//               <button
//                 onClick={() => handleRemoveFromCart(item._id)}
//                 className="btn btn-error text-white"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className='btn btn-primary' onClick={handleClearCart}>
//         Clear Cart
//       </button>

//       <NavLink to="/checkout" className="btn btn-success m-4 ">
//         Proceed to Checkout
//       </NavLink>
//     </div>
//   )
// }

// export default Cart

// v2
import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../context/CartContext/CartContext';
import { NavLink } from 'react-router';

const Cart = () => {
    const { cartItems, setCartItems, loadCartItems, handleRemoveFromCart, handleClearCart } = useContext(CartContext);
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
    const total = safeCartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-baseline gap-3 mb-10">
          <h2 className="text-4xl font-bold text-white tracking-tight">My Cart</h2>
          {safeCartItems.length > 0 && (
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-400/10 border border-indigo-400/25 px-3 py-1 rounded-full">
              {safeCartItems.length} item{safeCartItems.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Empty State */}
        {safeCartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-600">
            <span className="text-6xl mb-4">🛒</span>
            <p className="text-lg font-light tracking-widest uppercase">Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex flex-col gap-3 mb-6">
              {safeCartItems.map(item => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 bg-white/[0.03] hover:bg-indigo-500/[0.04] border border-white/[0.07] hover:border-indigo-500/20 rounded-2xl p-4 transition-all duration-200 hover:translate-x-1 group"
                >
                  {/* Image */}
                  <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white/5 ring-1 ring-inset ring-white/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-slate-100 truncate mb-1.5">{item.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {item.brand && (
                        <span className="text-[0.68rem] font-medium text-slate-500 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-md uppercase tracking-wide">
                          {item.brand}
                        </span>
                      )}
                      {item.category && (
                        <span className="text-[0.68rem] font-medium text-slate-500 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-md uppercase tracking-wide">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400 font-bold text-base">${item.price}</span>
                      <span className="text-[0.7rem] text-slate-600 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-md">
                        qty: {item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-red-500/[0.08] border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 hover:scale-110 transition-all duration-200 text-sm"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-6" />

            {/* Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white/[0.025] border border-white/[0.07] rounded-2xl px-6 py-5">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-slate-500 font-medium mb-1">Order Total</p>
                <p className="text-3xl font-bold text-white tracking-tight">
                  <span className="text-base text-indigo-400 font-normal mr-0.5">$</span>
                  {total.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  className="px-4 py-2.5 rounded-xl bg-transparent border border-red-500/25 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 text-sm font-medium transition-all duration-200 cursor-pointer"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>

                <NavLink
                  to="/checkout"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
                >
                  Checkout <span>→</span>
                </NavLink>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Cart;