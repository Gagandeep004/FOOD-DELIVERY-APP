import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/customer/Navbar";
import { useCart } from "../../context/CartContext";
import { getDishImage } from "../../utils/imageHelper";
import toast from "react-hot-toast";
import "../../styles/customer.css";

function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurantAndMenu();
  }, [id]);

  const fetchRestaurantAndMenu = async () => {
    try {
      setLoading(true);
      const [resR, resM] = await Promise.all([
        API.get("/restaurants"),
        API.get(`/menu/${id}`),
      ]);

      const found = resR.data.find((item) => String(item._id) === String(id));
      setRestaurant(found || null);
      setMenu(resM.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load restaurant details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`Added ${item.name} to Cart! 🛒`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2>Loading Restaurant Details...</h2>
        </div>
      </>
    );
  }

  if (!restaurant) {
    return (
      <>
        <Navbar />
        <div className="section-container" style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2>Restaurant Not Found</h2>
          <button className="btn-primary" onClick={() => navigate("/customer")} style={{ marginTop: "20px" }}>
            ← Back to Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="section-container" style={{ marginTop: "30px" }}>
        <button className="btn-secondary" onClick={() => navigate("/customer")} style={{ marginBottom: "20px" }}>
          ← Back to All Restaurants
        </button>

        <div className="restaurant-card" style={{ cursor: "default" }}>
          <div className="card-img-wrapper" style={{ height: "280px" }}>
            <img
              src={restaurant.image}
              alt={restaurant.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <div className="rating-badge" style={{ fontSize: "15px", padding: "6px 14px" }}>
              ⭐ {restaurant.rating || "4.6"}
            </div>
            <div className="delivery-badge" style={{ fontSize: "14px", padding: "6px 14px" }}>
              ⏱️ {restaurant.deliveryTime || "30 mins"}
            </div>
          </div>

          <div className="card-body" style={{ padding: "24px" }}>
            <h1 className="card-title" style={{ fontSize: "28px" }}>
              {restaurant.name}
            </h1>
            <p className="card-subtitle" style={{ fontSize: "16px" }}>
              {restaurant.cuisine} • {restaurant.address || "Main City"}
            </p>
          </div>
        </div>

        <div className="section-title" style={{ marginTop: "40px" }}>
          <span>Menu Items ({menu.length})</span>
        </div>

        {menu.length === 0 ? (
          <div className="empty-state">
            <p>No menu items available for this restaurant yet.</p>
          </div>
        ) : (
          <div className="menu-grid">
            {menu.map((item) => (
              <div className="menu-card" key={item._id}>
                <div className="card-img-wrapper">
                  <img
                    src={getDishImage(item.name, item.image)}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="rating-badge" style={{ background: "#ff4757", color: "white" }}>
                    {item.category || "Main"}
                  </div>
                </div>

                <div className="card-body">
                  <div className="card-title">{item.name}</div>
                  <div className="card-subtitle">{item.description || "Made fresh to order"}</div>

                  <div className="card-footer">
                    <span className="price-tag">₹{item.price}</span>
                    <button className="btn-primary" onClick={() => handleAddToCart(item)}>
                      + Add To Cart
                    </button>
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

export default RestaurantDetails;