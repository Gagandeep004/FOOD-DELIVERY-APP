import { useCart } from "../../context/CartContext";
import Navbar from "../../components/customer/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/customer.css";

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <>
      <Navbar />

      <div className="section-container" style={{ marginTop: "40px", maxWidth: "800px" }}>
        <div className="section-title">
          <span>🛒 Shopping Cart ({cart.length} unique items)</span>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Explore top dishes & restaurants to add delicious meals!</p>
            <button className="btn-primary" onClick={() => navigate("/customer")}>
              Browse Food Menu
            </button>
          </div>
        ) : (
          <div style={{ background: "white", padding: "28px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
            {cart.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 0",
                  borderBottom: "1px solid #f1f5f9",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "70px", height: "70px", borderRadius: "12px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                  }}
                />

                <div style={{ flex: 1, minWidth: "180px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "700" }}>{item.name}</h3>
                  <p style={{ fontSize: "14px", color: "#64748b" }}>₹{item.price} each</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    className="btn-secondary"
                    onClick={() => decreaseQuantity(item._id)}
                    style={{ padding: "4px 12px", fontSize: "16px", fontWeight: "700" }}
                  >
                    −
                  </button>

                  <span style={{ fontWeight: "700", minWidth: "20px", textAlign: "center" }}>
                    {item.quantity || 1}
                  </span>

                  <button
                    className="btn-secondary"
                    onClick={() => increaseQuantity(item._id)}
                    style={{ padding: "4px 12px", fontSize: "16px", fontWeight: "700" }}
                  >
                    +
                  </button>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: "800", fontSize: "18px" }}>
                    ₹{item.price * (item.quantity || 1)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ff4757",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600",
                      marginTop: "4px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: "24px",
                paddingTop: "20px",
                borderTop: "2px dashed #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <div style={{ color: "#64748b", fontSize: "14px" }}>Total Amount</div>
                <div className="price-tag" style={{ fontSize: "28px" }}>₹{total}</div>
              </div>

              <Link to="/customer/checkout" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ padding: "14px 28px", fontSize: "16px" }}>
                  Proceed To Checkout →
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;