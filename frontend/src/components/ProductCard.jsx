// import React from "react";
// import { Link } from "react-router";

// const ProductCard = ({ product }) => {
//   const { name, description, price, category, brand, _id, image } = product;
//   return (
//     <div>
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
//           <Link to={`/products/${_id}`} className="btn btn-active btn-primary">
//             Show Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// version 2

import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { name, description, price, category, brand, _id, image } = product;

  return (
    <div className="flex justify-center">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition duration-300 hover:-translate-y-1">
        {/* Image */}
        <figure className="h-52 overflow-hidden">
          <img
            src={
              image ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </figure>

        {/* Body */}
        <div className="card-body space-y-2">
          {/* Title + Brand */}
          <div className="flex justify-between items-start">
            <h2 className="card-title text-lg font-semibold">{name}</h2>

            <span className="badge badge-secondary badge-sm">{brand}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

          {/* Tags */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2">
              <span className="badge badge-outline">{category}</span>
            </div>

            <span className="text-primary font-semibold text-lg">${price}</span>
          </div>

          {/* Button */}
          {/* <div className="mt-4">
            <Link
              to={`/products/${_id}`}
              className="btn btn-primary w-full rounded-full"
            >
              Show Details →
            </Link>
          </div> */}
          <Link
            to={`/products/${_id}`}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
          >
            Show Details <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
