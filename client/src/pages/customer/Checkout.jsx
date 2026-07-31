import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import API from "../../services/api";
import Navbar from "../../components/customer/Navbar";
import toast from "react-hot-toast";
import "../../styles/customer.css";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [address, setAddress] = useState(user?.address || "");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [submitting, setSubmitting] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = async () => {
    if (!user || !user._id) {
      toast.error("Please log in to place an order");
      navigate("/");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter a valid delivery address");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setSubmitting(true);
      await API.post("/orders", {
        customer: user._id,
        items: cart.map((item) => ({
          menuItem: item._id,
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price,
        })),
        totalAmount: total,
        deliveryAddress: address,
        paymentMethod,
      });

      clearCart();
      toast.success("Order Placed Successfully! 🎉");
      navigate("/customer/orders");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="section-container" style={{ marginTop: "40px", maxWidth: "680px" }}>
        <div className="section-title">
          <span>Checkout & Pay</span>
        </div>

        <div style={{ background: "white", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
          <label style={{ fontWeight: "700", display: "block", marginBottom: "8px" }}>
            Delivery Address
          </label>
          <textarea
            rows="3"
            placeholder="Enter your full street address, apartment, and city..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              fontFamily: "inherit",
              fontSize: "15px",
              outline: "none",
              marginBottom: "20px",
            }}
          />

          <label style={{ fontWeight: "700", display: "block", marginBottom: "8px" }}>
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              fontFamily: "inherit",
              fontSize: "15px",
              outline: "none",
              marginBottom: "24px",
              background: "white",
            }}
          >
            <option value="COD">💵 Cash On Delivery (COD)</option>
            <option value="ONLINE">💳 Online Payment (UPI / Cards)</option>
          </select>

          <div
            style={{
              padding: "20px",
              background: "#f8fafc",
              borderRadius: "12px",
              marginBottom: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "600" }}>Total Amount to Pay</span>
            <span className="price-tag" style={{ fontSize: "24px" }}>₹{total}</span>
          </div>

          <button
            className="btn-primary"
            onClick={handlePlaceOrder}
            disabled={submitting}
            style={{ width: "100%", padding: "16px", fontSize: "16px" }}
          >
            {submitting ? "Processing Order..." : "Confirm & Place Order →"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;