// import { useEffect, useState } from "react";
// import { CartContext } from "./CartContext";
// import { useContext } from "react";
// import { AuthContext } from "../AuthContext/AuthContext";

// const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const { user } = useContext(AuthContext);

//   //   const loadCartItems = () => {
//   //     fetch("http://localhost:1272/cart")
//   //       .then(res => res.json())
//   //       .then(data => setCartItems(data));
//   //   };
//   const loadCartItems = () => {
//     // fetch("http://localhost:1272/cart")
//     fetch(`http://localhost:1272/cart?email=${user.email}`)
//       .then((res) => res.json())
//       // .then(data => setCartItems(data))
//       // .then((data) => setCartItems(Array.isArray(data) ? data : []))
//       .then((data) => {
//         console.log("Cart API response:", data);
//         setCartItems(Array.isArray(data) ? data : []);
//       })
//       .catch((error) => {
//         console.error("Cart fetch error:", error);
//         setCartItems([]);
//       });
//   };
//   useEffect(() => {
//     loadCartItems();
//   }, []);

//   // handleAddToCart
//   const handleAddToCart = (product) => {
//     const cartItem = {
//       userEmail: user.email,
//       productId: product._id,
//       name: product.name,
//       price: product.price,
//       brand: product.brand,
//       image: product.image,
//       quantity: 1,
//     };
//     // send cartItem to backend
//     return fetch("http://localhost:1272/cart", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(cartItem),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         loadCartItems();
//         // navigate("/cart");
//       });
//   };

//   const handleRemoveFromCart = (id) => {
//     return fetch(`http://localhost:1272/cart/${id}`, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         loadCartItems();
//       });
//   };

//   const handleClearCart = () => {
//     return fetch("http://localhost:1272/cart", {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setCartItems([]);
//         // loadCartItems();
//       });
//   };

//   useEffect(() => {
//     loadCartItems();
//   }, []);

//   const cartInfo = {
//     cartItems,
//     setCartItems,
//     loadCartItems,
//     handleAddToCart,
//     handleRemoveFromCart,
//     handleClearCart,
//   };

//   return (
//     <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
//   );
// };

// export default CartProvider;

import { useEffect, useState, useContext } from "react";
import { CartContext } from "./CartContext";
import { AuthContext } from "../AuthContext/AuthContext";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const authValue = useContext(AuthContext);
  const user = authValue?.user;

  const loadCartItems = (email) => {
    if (!email) {
      setCartItems([]);
      return;
    }

    fetch(`http://localhost:1272/cart?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Cart API response:", data);
        setCartItems(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Cart fetch error:", error);
        setCartItems([]);
      });
  };

  useEffect(() => {
    if (user?.email) {
      loadCartItems(user.email);
    } else {
      setCartItems([]);
    }
  }, [user]);

  const handleAddToCart = (product) => {
    if (!user?.email) {
      console.log("User not logged in");
      return Promise.resolve();
    }

    const cartItem = {
      userEmail: user.email,
      productId: product._id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      image: product.image,
      quantity: 1,
    };

    return fetch("http://localhost:1272/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        loadCartItems(user.email);
      });
  };

  const handleRemoveFromCart = (id) => {
    return fetch(`http://localhost:1272/cart/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (user?.email) loadCartItems(user.email);
      });
  };

  // v1
  // const handleClearCart = () => {
  //   setCartItems([]);
  // };

  // v2
  const handleClearCart = () => {
    if (!user?.email) return;

    fetch(`http://localhost:1272/cart?email=${user.email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => loadCartItems(user.email));
  };

  const cartInfo = {
    cartItems,
    setCartItems,
    loadCartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleClearCart,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
