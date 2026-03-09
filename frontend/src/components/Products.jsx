import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("http://localhost:1272/products")
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
  return (
    <div className='m-6'>
      <h2>Products</h2>
      <ul className='grid grid-cols-3'>
        {products.map(product => (
        //   <li key={product.id}>{product.name}</li>
        <ProductCard product={product} key={product._id}></ProductCard>
        ))}
      </ul>
    </div>
  )
}

export default Products