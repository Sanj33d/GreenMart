import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

//   const loadCartItems = () => {
//     fetch("http://localhost:1272/cart")
//       .then(res => res.json())
//       .then(data => setCartItems(data));
//   };
  const loadCartItems = () => {
        fetch("http://localhost:1272/cart")
        .then(res => res.json())
        .then(data => setCartItems(data))
    };
    useEffect(() => {
        loadCartItems();
    }, []);

    // handleAddToCart
  const handleAddToCart = (product) => {
    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      image: product.image,
      quantity: 1,
    };
        // send cartItem to backend
        return fetch("http://localhost:1272/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartItem)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            loadCartItems();
            // navigate("/cart");
        });
    };

    const handleRemoveFromCart = (id) => {
       return fetch(`http://localhost:1272/cart/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            loadCartItems();
        });
    };

    const handleClearCart = () => {
        return fetch("http://localhost:1272/cart", {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setCartItems([])
            // loadCartItems();
        });
    };

  useEffect(() => {
    loadCartItems();
  }, []);

  const cartInfo = {
    cartItems,
    setCartItems,
    loadCartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleClearCart
  };

  return (
    <CartContext.Provider value={cartInfo}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;