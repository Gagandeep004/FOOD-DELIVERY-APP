import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/customer/Navbar";
import toast from "react-hot-toast";
import "../../styles/customer.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/orders");
      setOrders(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f59e0b";
      case "Accepted":
        return "#3b82f6";
      case "Out for Delivery":
        return "#8b5cf6";
      case "Delivered":
        return "#10b981";
      default:
        return "#64748b";
    }
  };

  return (
    <>
      <Navbar />

      <div className="section-container" style={{ marginTop: "40px", maxWidth: "800px" }}>
        <div className="section-title">
          <span>📦 My Orders ({orders.length})</span>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <h3>Loading orders...</h3>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h3>No orders found</h3>
            <p>Your previous order history will appear here once you place an order.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "white",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#64748b", fontWeight: "700" }}>
                      Order ID: #{order._id}
                    </span>
                    <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <span
                    style={{
                      background: `${getStatusColor(order.status)}15`,
                      color: getStatusColor(order.status),
                      border: `1px solid ${getStatusColor(order.status)}`,
                      padding: "6px 16px",
                      borderRadius: "9999px",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    ● {order.status}
                  </span>
                </div>

                <div style={{ borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "12px 0", margin: "12px 0" }}>
                  {order.items?.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "4px 0" }}>
                      <span>{item.name} x {item.quantity}</span>
                      <span style={{ fontWeight: "600" }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>
                    📍 {order.deliveryAddress}
                  </div>
                  <div className="price-tag" style={{ fontSize: "20px" }}>
                    Total: ₹{order.totalAmount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Orders;