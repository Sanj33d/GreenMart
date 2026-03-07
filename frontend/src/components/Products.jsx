import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/products")
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
        //   <li key={product.id}>{product.name}</li>
        <ProductCard product={product} key={product._id}></ProductCard>
        ))}
      </ul>
    </div>
  )
}

export default Products