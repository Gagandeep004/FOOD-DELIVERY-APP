import { useState } from "react";
import { useCart } from "../../context/CartContext";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("/orders", {
        customer: user._id,
        items: cart.map((item) => ({
          menuItem: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        deliveryAddress: address,
        paymentMethod,
      });

      alert("Order placed successfully!");

      navigate("/customer/orders");
    } catch (error) {
      console.log(error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="cart-container">
      <h1>Checkout</h1>

      <textarea
        rows="4"
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <br /><br />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="COD">Cash on Delivery</option>
        <option value="ONLINE">Online Payment</option>
      </select>

      <br /><br />

      <h2>Total: ₹ {total}</h2>

      <button
        className="checkout-btn"
        onClick={placeOrder}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;