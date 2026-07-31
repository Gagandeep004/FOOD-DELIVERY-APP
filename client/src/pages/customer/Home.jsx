import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/customer/Navbar";
import Hero from "../../components/customer/Hero";
import Categories from "../../components/customer/Categories";
import RestaurantCard from "../../components/customer/RestaurantCard";
import { useCart } from "../../context/CartContext";
import { getDishImage } from "../../utils/imageHelper";
import toast from "react-hot-toast";
import "../../styles/customer.css";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  const fetchData = async () => {
    try {
      setLoading(true);

      const [resR, resM] = await Promise.all([
        API.get("/restaurants"),
        API.get("/menu"),
      ]);

      // Auto seed if database is empty
      if ((!resR.data || resR.data.length === 0) || (!resM.data || resM.data.length === 0)) {
        console.log("Seeding database automatically...");
        await API.get("/seed");
        const [seededR, seededM] = await Promise.all([
          API.get("/restaurants"),
          API.get("/menu"),
        ]);
        setRestaurants(seededR.data || []);
        setMenus(seededM.data || []);
      } else {
        setRestaurants(resR.data);
        setMenus(resM.data);
      }
    } catch (error) {
      console.error("Error fetching home data:", error);
      toast.error("Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`Added ${item.name} to Cart! 🛒`);
  };

  // Filter restaurants
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const query = searchTerm.toLowerCase().trim();
    const name = (restaurant.name || "").toLowerCase();
    const cuisine = (restaurant.cuisine || "").toLowerCase();
    const category = selectedCategory.toLowerCase();

    // Check search term
    const matchesSearch = !query || name.includes(query) || cuisine.includes(query);

    // Check category
    if (selectedCategory === "All") return matchesSearch;

    const knownCategories = ["pizza", "burger", "salad", "chicken", "dessert", "drinks"];

    const matchingRestaurantIds = new Set(
      menus
        .filter((m) => {
          const cat = (m.category || "").toLowerCase();
          if (category === "other") return !knownCategories.includes(cat);
          return cat.includes(category);
        })
        .map((m) => String(m.restaurant))
    );

    const matchesCategory =
      category === "other"
        ? matchingRestaurantIds.has(String(restaurant._id)) ||
          !knownCategories.some((term) => cuisine.includes(term) || name.includes(term))
        : cuisine.includes(category) || name.includes(category) || matchingRestaurantIds.has(String(restaurant._id));

    return matchesSearch && matchesCategory;
  });

  // Filter dishes directly by category or search term
  const filteredDishes = menus.filter((dish) => {
    const query = searchTerm.toLowerCase().trim();
    const dishName = (dish.name || "").toLowerCase();
    const cat = (dish.category || "").toLowerCase();
    const desc = (dish.description || "").toLowerCase();

    const matchesSearch = !query || dishName.includes(query) || cat.includes(query) || desc.includes(query);

    if (selectedCategory === "All") return matchesSearch;

    const knownCategories = ["pizza", "burger", "salad", "chicken", "dessert", "drinks"];
    const targetCategory = selectedCategory.toLowerCase();

    const matchesCategory =
      targetCategory === "other"
        ? !knownCategories.includes(cat)
        : cat.includes(targetCategory);

    return matchesSearch && matchesCategory;
  });

  // Compute counts of menu items per category
  const countsMap = menus.reduce((acc, m) => {
    const cat = m.category || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  // Compute first menu image per restaurant to use as thumbnail
  const thumbnails = menus.reduce((map, m) => {
    const r = String(m.restaurant);
    if (!map[r] && m.image) map[r] = getDishImage(m.name, m.image);
    return map;
  }, {});

  if (loading) {
    return (
      <>
        <Navbar />
        <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2>Loading delicious options... 🍕</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Categories
        selected={selectedCategory}
        setSelected={setSelectedCategory}
        counts={countsMap}
      />

      {/* Featured Restaurants Section */}
      <div className="section-container">
        <div className="section-title">
          <span>Top Rated Restaurants ({filteredRestaurants.length})</span>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🍽️</div>
            <h3>No restaurants found for "{selectedCategory}"</h3>
            <p>Try switching categories or search for another dish name!</p>
            <button
              className="btn-primary"
              onClick={() => {
                setSelectedCategory("All");
                setSearchTerm("");
              }}
            >
              Show All Categories
            </button>
          </div>
        ) : (
          <div className="restaurant-grid">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={restaurant}
                thumbnail={thumbnails[String(restaurant._id)]}
              />
            ))}
          </div>
        )}
      </div>

      {/* Matching Food Dishes Section */}
      <div className="section-container" style={{ marginTop: "40px" }}>
        <div className="section-title">
          <span>
            {selectedCategory === "All"
              ? "Popular Dishes"
              : `${selectedCategory} Dishes (${filteredDishes.length})`}
          </span>
        </div>

        {filteredDishes.length === 0 ? (
          <div className="empty-state" style={{ padding: "40px 20px" }}>
            <p>No individual dishes matched your filter.</p>
          </div>
        ) : (
          <div className="menu-grid">
            {filteredDishes.map((dish) => (
              <div className="menu-card" key={dish._id}>
                <div className="card-img-wrapper">
                  <img
                    src={getDishImage(dish.name, dish.image)}
                    alt={dish.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="rating-badge" style={{ background: "#ff4757", color: "white" }}>
                    {dish.category || "Main"}
                  </div>
                </div>

                <div className="card-body">
                  <div className="card-title">{dish.name}</div>
                  <div className="card-subtitle">{dish.description || "Freshly prepared with quality ingredients"}</div>

                  <div className="card-footer">
                    <span className="price-tag">₹{dish.price}</span>
                    <button
                      className="btn-primary"
                      onClick={() => handleAddToCart(dish)}
                      style={{ padding: "8px 16px", fontSize: "13px" }}
                    >
                      + Add to Cart
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

export default Home;
