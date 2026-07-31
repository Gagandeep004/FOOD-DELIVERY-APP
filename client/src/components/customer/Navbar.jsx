import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const totalCartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate(user?.role === "customer" ? "/customer" : "/")}>
        🍔 FoodDash
      </div>

      <ul>
        <li>
          <Link to="/customer" className={location.pathname === "/customer" ? "active" : ""}>
            <span>🏠</span> Home
          </Link>
        </li>

        <li>
          <Link to="/customer/orders" className={location.pathname === "/customer/orders" ? "active" : ""}>
            <span>📦</span> Orders
          </Link>
        </li>

        <li>
          <Link to="/customer/cart" className={location.pathname === "/customer/cart" ? "active" : ""}>
            <span>🛒</span> Cart {totalCartCount > 0 && <span className="cart-badge">{totalCartCount}</span>}
          </Link>
        </li>

        <li>
          <Link to="/customer/profile" className={location.pathname === "/customer/profile" ? "active" : ""}>
            <span>👤</span> {user?.name ? user.name.split(" ")[0] : "Profile"}
          </Link>
        </li>

        {user && (
          <li>
            <button
              onClick={handleLogout}
              className="btn-secondary"
              style={{ padding: "6px 14px", fontSize: "13px" }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;