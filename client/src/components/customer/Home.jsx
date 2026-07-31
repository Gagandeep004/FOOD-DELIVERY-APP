export { default } from "../../pages/customer/Home";
const [selectedCategory, setSelectedCategory] = useState("All");

const filteredRestaurants =
    selectedCategory === "All"
        ? restaurants
        : restaurants.filter(
              (restaurant) =>
                  restaurant.cuisine === selectedCategory
          );
filteredRestaurants.map(...)