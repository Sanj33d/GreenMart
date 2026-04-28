// import React, { useContext } from 'react'
// import { Link, useLoaderData, useNavigate } from 'react-router'
// import { CartContext } from '../context/CartContext/CartContext';

// const ProductDetails = () => {
//     const product = useLoaderData();
//     console.log(product);
//     const navigate = useNavigate();

//     const { name, description, price, category, brand, image } = product;

//     const { handleAddToCart } = useContext(CartContext);
//     const onAddToCart = () => {
//     handleAddToCart(product).then(() => {
//       navigate("/cart");
//     });
//     };
//     // // handleAddToCart
//     // const handleAddToCart = () => {
//     //     const cartItem = {
//     //         productId: _id,
//     //         name,
//     //         price,
//     //         brand,
//     //         image,
//     //         quantity: 1
//     //     }
//     //     // send cartItem to backend
//     //     fetch("http://localhost:1272/cart", {
//     //         method: "POST",
//     //         headers: {
//     //             "Content-Type": "application/json"
//     //         },
//     //         body: JSON.stringify(cartItem)
//     //     })
//     //     .then(res => res.json())
//     //     .then(data => {
//     //         console.log(data);
//     //         loadCartItems();
//     //         navigate("/cart");
//     //     });
//     // };

//   return (
//     <div className='flex justify-center'>
//       <div className="card bg-base-100 w-96 shadow-sm">
//         <figure>
//           <img
//             src={image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
//             alt="Shoes"
//           />
//         </figure>
//         <div className="card-body">
//           <h2 className="card-title">
//             {name}
//             <div className="badge badge-secondary">{brand}</div>
//           </h2>
//           {/* <p>A card component has a figure, a body part, and inside body there are title and actions parts</p> */}
//           <p>{description}</p>
//           <div className="card-actions justify-end">
//             <div className="badge badge-outline">{category}</div>
//             <div className="badge badge-outline">{price} $</div>
//           </div>

//           {/* btn */}
//           <button onClick={onAddToCart} className="btn btn-active btn-primary">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductDetails

// v2
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { CartContext } from "../context/CartContext/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { handleAddToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const onAddToCart = () => {
    handleAddToCart(product).then(() => {
      navigate("/cart");
    });
  };

  useEffect(() => {
    fetch(`http://localhost:1272/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-2xl shadow-xl p-6 grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          <img
            src={
              product.image ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-indigo-400 text-xl font-semibold">
            ${product.price}
          </p>

          <p className="text-gray-400">{product.description}</p>

          <div className="flex gap-3 flex-wrap text-sm">
            <span className="border border-gray-600 px-3 py-1 rounded">
              Category: {product.category}
            </span>
            <span className="border border-gray-600 px-3 py-1 rounded">
              Stock: {product.stock}
            </span>
            <span className="border border-gray-600 px-3 py-1 rounded">
              Rating: ★ {product.rating || 0}
            </span>
          </div>

          {/* <button
            onClick={onAddToCart}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded font-medium"
          >
            Add to Cart
          </button> */}
          <button
            onClick={onAddToCart}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
          >
            Add to Cart <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
