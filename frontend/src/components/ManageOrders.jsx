import { useEffect, useState } from "react";

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
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="p-6 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Manage Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-800 rounded-xl p-5 shadow-md"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <p><strong>User:</strong> {order.userEmail}</p>
                  <p><strong>Status:</strong> {order.orderStatus}</p>
                  <p><strong>Payment:</strong> {order.paymentStatus}</p>
                  <p><strong>Total:</strong> ${order.totalAmount}</p>
                  {/* <p><strong>Shipping Info:</strong> {order.shippingInfo?.address}</p> */}
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <select
                    className="select select-bordered bg-slate-700 text-white"
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="pending">pending</option>
                    <option value="processing">processing</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-semibold mb-2">Items:</p>
                <div className="space-y-1">
                  {order.items?.map((item, index) => (
                    <div key={index} className="text-sm text-gray-300">
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </div>
              </div>

              {order.shippingInfo && (
                <div className="mt-4 text-sm text-gray-300">
                  <p className="font-semibold text-white mb-1">Shipping Info:</p>
                  <p>Name: {order.shippingInfo.fullName}</p>
                  <p>Phone: {order.shippingInfo.phone}</p>
                  <p>Address: {order.shippingInfo.address}</p>
                  <p>City: {order.shippingInfo.city}</p>
                  <p>Postal Code: {order.shippingInfo.postalCode}</p>
                  {order.shippingInfo.notes && (
                    <p>Notes: {order.shippingInfo.notes}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;