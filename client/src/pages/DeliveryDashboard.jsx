import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/delivery.css";


function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get(`/delivery/${user._id}/orders`);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/delivery/order/${id}/status`, {
        status,
      });

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const statusClass = (status) => {
    switch (status) {
      case "Pending":
        return "pending";
      case "Accepted":
        return "accepted";
      case "Out for Delivery":
        return "delivery";
      case "Delivered":
        return "delivered";
      default:
        return "pending";
    }
  };

  return (
    <div className="delivery-container">

      <h1 className="delivery-title">
        🚚 Delivery Dashboard
      </h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h1>📦</h1>
          <h2>No Assigned Orders</h2>
          <p>New orders will appear here.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <div>
                <div className="customer-name">
                  {order.customer?.name}
                </div>

                <div className="order-id">
                  Order ID: {order._id}
                </div>
              </div>

              <div className="total">
                ₹ {order.totalAmount}
              </div>
            </div>

            <div className="address">
              📍 {order.deliveryAddress}
            </div>

            <span className={`status ${statusClass(order.status)}`}>
              {order.status}
            </span>

            <div className="button-group">

              <button
                className="accept-btn"
                onClick={() =>
                  updateStatus(order._id, "Accepted")
                }
              >
                Accept
              </button>

              <button
                className="out-btn"
                onClick={() =>
                  updateStatus(order._id, "Out for Delivery")
                }
              >
                Out for Delivery
              </button>

              <button
                className="done-btn"
                onClick={() =>
                  updateStatus(order._id, "Delivered")
                }
              >
                Delivered
              </button>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DeliveryDashboard;