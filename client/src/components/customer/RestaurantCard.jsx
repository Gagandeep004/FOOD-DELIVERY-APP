import { Link } from "react-router-dom";

function RestaurantCard({ restaurant, thumbnail }) {
  const imgSrc = thumbnail || restaurant.image;

  return (
    <Link
      to={`/restaurant/${restaurant._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="restaurant-card">
        <div className="card-img-wrapper">
          <img
            src={imgSrc}
            alt={restaurant.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="rating-badge">⭐ {restaurant.rating || "4.5"}</div>
          <div className="delivery-badge">⏱️ {restaurant.deliveryTime || "25-30 mins"}</div>
        </div>

        <div className="card-body">
          <div className="card-title">{restaurant.name}</div>
          <div className="card-subtitle">
            {restaurant.cuisine} • {restaurant.address || "Main City"}
          </div>

          <div className="card-footer">
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#ff4757" }}>
              Explore Menu →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;