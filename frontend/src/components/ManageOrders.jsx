// import { useEffect, useState } from "react";

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);

//   const loadOrders = () => {
//     fetch("http://localhost:1272/orders")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("All orders:", data);
//         setOrders(Array.isArray(data) ? data : []);
//       })
//       .catch((error) => {
//         console.error("Failed to load orders:", error);
//         setOrders([]);
//       });
//   };

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const res = await fetch(`http://localhost:1272/orders/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       const data = await res.json();
//       console.log("Status update:", data);

//       loadOrders();
//     } catch (error) {
//       console.error("Failed to update order status:", error);
//     }
//   };

//   return (
//     <div className="p-6 text-white min-h-screen">
//       <h2 className="text-3xl font-bold mb-6">Manage Orders</h2>

//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-slate-800 rounded-xl p-5 shadow-md"
//             >
//               <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
//                 <div>
//                   <p><strong>User:</strong> {order.userEmail}</p>
//                   <p><strong>Status:</strong> {order.orderStatus}</p>
//                   <p><strong>Payment:</strong> {order.paymentStatus}</p>
//                   <p><strong>Total:</strong> ${order.totalAmount}</p>
//                   {/* <p><strong>Shipping Info:</strong> {order.shippingInfo?.address}</p> */}
//                   <p>
//                     <strong>Date:</strong>{" "}
//                     {new Date(order.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <div>
//                   <select
//                     className="select select-bordered bg-slate-700 text-white"
//                     value={order.orderStatus}
//                     onChange={(e) =>
//                       handleStatusChange(order._id, e.target.value)
//                     }
//                   >
//                     <option value="pending">pending</option>
//                     <option value="processing">processing</option>
//                     <option value="shipped">shipped</option>
//                     <option value="delivered">delivered</option>
//                     <option value="cancelled">cancelled</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <p className="font-semibold mb-2">Items:</p>
//                 <div className="space-y-1">
//                   {order.items?.map((item, index) => (
//                     <div key={index} className="text-sm text-gray-300">
//                       {item.name} × {item.quantity}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {order.shippingInfo && (
//                 <div className="mt-4 text-sm text-gray-300">
//                   <p className="font-semibold text-white mb-1">Shipping Info:</p>
//                   <p>Name: {order.shippingInfo.fullName}</p>
//                   <p>Phone: {order.shippingInfo.phone}</p>
//                   <p>Address: {order.shippingInfo.address}</p>
//                   <p>City: {order.shippingInfo.city}</p>
//                   <p>Postal Code: {order.shippingInfo.postalCode}</p>
//                   {order.shippingInfo.notes && (
//                     <p>Notes: {order.shippingInfo.notes}</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageOrders;

// v2
import { useEffect, useState } from "react";

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

const paymentStyles = {
  paid:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  unpaid:  "bg-red-500/10 text-red-400 border-red-500/25",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/25",
};

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    fetch("http://localhost:1272/orders")
      .then((res) => res.json())
      .then((data) => {
        console.log("All orders:", data);
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load orders:", error);
        setOrders([]);
      });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:1272/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      console.log("Status update:", data);
      loadOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-baseline items-center gap-3 mb-10">
          <h2 className="text-4xl font-bold text-white tracking-tight">Manage Orders</h2>
          {orders.length > 0 && (
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-400/10 border border-indigo-400/25 px-3 py-1 rounded-full">
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-600">
            <span className="text-6xl mb-4">🗂️</span>
            <p className="text-lg font-light tracking-widest uppercase">No orders found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order, i) => {
              const statusKey = order.orderStatus?.toLowerCase();
              const paymentKey = order.paymentStatus?.toLowerCase();
              const badgeClass = statusStyles[statusKey] || "bg-slate-500/10 text-slate-400 border-slate-500/25";
              const dotClass = statusDot[statusKey] || "bg-slate-400";
              const payBadgeClass = paymentStyles[paymentKey] || "bg-slate-500/10 text-slate-400 border-slate-500/25";

              return (
                <div
                  key={order._id}
                  className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.07] hover:border-indigo-500/20 rounded-2xl p-5 transition-all duration-200"
                >
                  {/* Top row: meta + status selector */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    
                    {/* Left: order info */}
                    <div className="flex flex-col gap-2 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[0.68rem] uppercase tracking-widest text-slate-600">Order #{i + 1}</span>
                        {/* Status badge */}
                        <span className={`inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                          {order.orderStatus}
                        </span>
                        {/* Payment badge */}
                        <span className={`inline-flex items-center text-[0.7rem] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${payBadgeClass}`}>
                          {order.paymentStatus}
                        </span>
                      </div>

                      <p className="text-sm text-slate-300 truncate">
                        <span className="text-slate-600 text-xs mr-1.5">User</span>
                        {order.userEmail}
                      </p>

                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-bold text-white bg-white/[0.05] border border-white/[0.08] px-3 py-0.5 rounded-full">
                          ${order.totalAmount}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Right: status selector */}
                    <div className="flex-shrink-0">
                      <select
                        className="bg-slate-900 text-slate-200 text-sm border border-white/10 hover:border-indigo-500/40 focus:border-indigo-500/60 focus:outline-none px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer"
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.05] mb-4" />

                  {/* Items */}
                  <div className="mb-1">
                    <p className="text-[0.68rem] uppercase tracking-widest text-slate-600 mb-2">Items</p>
                    <div className="flex flex-col gap-1.5">
                      {order.items?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-slate-300 truncate">{item.name}</span>
                          <span className="text-xs text-slate-600 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-md flex-shrink-0 ml-3">
                            × {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping info */}
                  {order.shippingInfo && (
                    <>
                      <div className="h-px bg-white/[0.05] my-4" />
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-widest text-slate-600 mb-2">Shipping Info</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                          {[
                            ["Name",        order.shippingInfo.fullName],
                            ["Phone",       order.shippingInfo.phone],
                            ["Address",     order.shippingInfo.address],
                            ["City",        order.shippingInfo.city],
                            ["Postal Code", order.shippingInfo.postalCode],
                            order.shippingInfo.notes && ["Notes", order.shippingInfo.notes],
                          ]
                            .filter(Boolean)
                            .map(([label, value]) => (
                              <div key={label} className="flex gap-2 text-sm">
                                <span className="text-slate-600 flex-shrink-0">{label}:</span>
                                <span className="text-slate-300 truncate">{value}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageOrders;