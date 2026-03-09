import React from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'

const ProductDetails = () => {
    const product = useLoaderData();
    console.log(product);
    const navigate = useNavigate();

    const { name, description, price, category, brand, _id, image } = product;
    // handleAddToCart
    const handleAddToCart = () => {
        const cartItem = {
            productId: _id,
            name,  
            price,
            brand,
            image,
            quantity: 1
        }
        // send cartItem to backend
        fetch("http://localhost:1272/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartItem)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            navigate("/cart");
        });
    };

  return (
    <div className='flex justify-center'>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name}
            <div className="badge badge-secondary">{brand}</div>
          </h2>
          {/* <p>A card component has a figure, a body part, and inside body there are title and actions parts</p> */}
          <p>{description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{category}</div>
            <div className="badge badge-outline">{price} $</div>
          </div>

          {/* btn */}
          <button onClick={handleAddToCart} className="btn btn-active btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails