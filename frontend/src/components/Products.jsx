// import React, { useEffect, useState } from 'react'
// import ProductCard from './ProductCard'

// const Products = () => {

//     const [products, setProducts] = useState([])

//     useEffect(() => {
//         fetch("http://localhost:1272/products")
//         .then(res => res.json())
//         .then(data => setProducts(data))
//     }, [])
//     console.log(products);
//   return (
//     <div className='m-6'>
//       <h2>Products</h2>
//       <ul className='grid grid-cols-3'>
//         {products.map(product => (
//         //   <li key={product.id}>{product.name}</li>
//         <ProductCard product={product} key={product._id}></ProductCard>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default Products

// version 2
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import ProductCard from "./ProductCard";
import { CartContext } from "../context/CartContext/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { handleAddToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:1272/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-indigo-400 uppercase tracking-widest text-sm mb-2">
            ShopiMart Collection
          </p>
          <h1 className="text-4xl font-bold">Explore Products</h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Discover electronics, gadgets, and essentials curated just for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
              navigate={navigate}
            />
          ))}
        </div>

        {/* Empty state */}
        {products.length === 0 && (
          <p className="text-center text-gray-400 mt-20">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;