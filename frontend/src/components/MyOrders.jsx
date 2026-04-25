import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

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
    <div className="p-6 text-white">
      <h2 className="text-3xl mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="bg-gray-800 p-4 mb-4 rounded">
            <p><strong>Status:</strong> {order.orderStatus}</p>
            <p><strong>Total:</strong> ${order.totalAmount}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <div className="mt-2">
              {order.items.map(item => (
                <div key={item._id}>
                  {item.name} × {item.quantity}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;