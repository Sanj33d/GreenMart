// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext/AuthContext";

// const MyOrders = () => {
//   const { user } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!user?.email) return;

//     fetch(`http://localhost:1272/orders/${user.email}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("My orders:", data);
//         setOrders(data);
//       });
//   }, [user]);

//   return (
//     <div className="p-6 text-white">
//       <h2 className="text-3xl mb-4">My Orders</h2>

//       {orders.length === 0 ? (
//         <p>No orders yet</p>
//       ) : (
//         orders.map(order => (
//           <div key={order._id} className="bg-gray-800 p-4 mb-4 rounded">
//             <p><strong>Status:</strong> {order.orderStatus}</p>
//             <p><strong>Total:</strong> ${order.totalAmount}</p>
//             <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

//             <div className="mt-2">
//               {order.items.map(item => (
//                 <div key={item._id}>
//                   {item.name} × {item.quantity}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyOrders;

// v2
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

const statusStyles = {
  pending:    "bg-yellow-500/10 text-yellow-400 border-yellow-500/25",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/25",
  shipped:    "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
  delivered:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  cancelled:  "bg-red-500/10 text-red-400 border-red-500/25",
};

const statusDot = {
  pending:    "bg-yellow-400",
  processing: "bg-blue-400",
  shipped:    "bg-indigo-400",
  delivered:  "bg-emerald-400",
  cancelled:  "bg-red-400",
};

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:1272/orders/${user.email}`)
      .then(res => res.json())
      .then(data => {
        console.log("My orders:", data);
        setOrders(data);
      });
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center items-baseline gap-3 mb-10">
          <h2 className="text-4xl font-bold text-white tracking-tight">My Orders</h2>
          {orders.length > 0 && (
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-400/10 border border-indigo-400/25 px-3 py-1 rounded-full">
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-600">
            <span className="text-6xl mb-4">📦</span>
            <p className="text-lg font-light tracking-widest uppercase">No orders yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order, i) => {
              const statusKey = order.orderStatus?.toLowerCase();
              const badgeClass = statusStyles[statusKey] || "bg-slate-500/10 text-slate-400 border-slate-500/25";
              const dotClass = statusDot[statusKey] || "bg-slate-400";

              return (
                <div
                  key={order._id}
                  className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.07] hover:border-indigo-500/20 rounded-2xl p-5 transition-all duration-200"
                >
                  {/* Order top row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-widest text-slate-600 mb-1">Order #{i + 1}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Status badge */}
                      <span className={`inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                        {order.orderStatus}
                      </span>
                      {/* Total */}
                      <span className="text-sm font-bold text-white bg-white/[0.05] border border-white/[0.08] px-3 py-1 rounded-full">
                        ${order.totalAmount}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.05] mb-4" />

                  {/* Items */}
                  <div className="flex flex-col gap-1.5">
                    {order.items.map(item => (
                      <div key={item._id} className="flex items-center justify-between">
                        <span className="text-sm text-slate-300 truncate">{item.name}</span>
                        <span className="text-xs text-slate-600 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-md flex-shrink-0 ml-3">
                          × {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrders;