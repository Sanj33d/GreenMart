import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { name, description, price, category, brand, _id, image } = product;
  return (
    <div>
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
          <Link to={`/products/${_id}`} className="btn btn-active btn-primary">
            Show Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
