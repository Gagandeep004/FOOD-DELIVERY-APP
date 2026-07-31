import Restaurant from "../models/Restaurant.js";
import Menu from "../models/Menu.js";

export const seedRestaurants = async (req, res) => {
  try {
    await Menu.deleteMany();
    await Restaurant.deleteMany();

    const restaurants = await Restaurant.insertMany([
      {
        name: "Pizza Hub",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        address: "Delhi",
        deliveryTime: "30 mins",
      },
      {
        name: "Burger Town",
        cuisine: "Fast Food",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        rating: 4.3,
        address: "Mumbai",
        deliveryTime: "25 mins",
      },
      {
        name: "Spicy House",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        address: "Bangalore",
        deliveryTime: "35 mins",
      }
    ]);

    await Menu.insertMany([
      {
        restaurant: restaurants[0]._id,
        name: "Margherita Pizza",
        price: 299,
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
        category: "Pizza",
        description: "Classic cheese pizza with rich tomato sauce and fresh basil"
      },
      {
        restaurant: restaurants[0]._id,
        name: "Farmhouse Pizza",
        price: 399,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        category: "Pizza",
        description: "Loaded with capsicum, onion, tomato, and fresh mushrooms"
      },
      {
        restaurant: restaurants[0]._id,
        name: "Pepperoni Pizza",
        price: 379,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
        category: "Pizza",
        description: "Spicy pepperoni with melted mozzarella cheese"
      },
      {
        restaurant: restaurants[0]._id,
        name: "Veggie Delight Pizza",
        price: 359,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
        category: "Pizza",
        description: "Loaded with sweet corn, jalapenos, and garden vegetables"
      },
      {
        restaurant: restaurants[1]._id,
        name: "Cheese Burger",
        price: 199,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        category: "Burger",
        description: "Juicy beef patty topped with melted cheddar cheese"
      },
      {
        restaurant: restaurants[1]._id,
        name: "Chicken Burger",
        price: 249,
        image: "https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=800&q=80",
        category: "Burger",
        description: "Crispy fried chicken breast fillet with lettuce and mayo"
      },
      {
        restaurant: restaurants[1]._id,
        name: "Double Patty Burger",
        price: 299,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
        category: "Burger",
        description: "Two juicy patties with double cheese and fresh pickles"
      },
      {
        restaurant: restaurants[1]._id,
        name: "Veggie Burger",
        price: 219,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
        category: "Burger",
        description: "Crispy vegetable patty with special herbs and signature sauce"
      },
      {
        restaurant: restaurants[2]._id,
        name: "Butter Chicken",
        price: 349,
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
        category: "Indian",
        description: "Rich and creamy butter chicken curry in tomato gravy"
      },
      {
        restaurant: restaurants[2]._id,
        name: "Paneer Butter Masala",
        price: 289,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
        category: "Indian",
        description: "Tender cottage cheese cubes cooked in spiced butter gravy"
      },
      {
        restaurant: restaurants[2]._id,
        name: "Chicken Tikka Masala",
        price: 329,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        category: "Chicken",
        description: "Char-grilled chicken pieces simmered in rich spiced tikka sauce"
      },
      {
        restaurant: restaurants[2]._id,
        name: "Chicken 65",
        price: 279,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
        category: "Chicken",
        description: "Deep-fried spicy chicken marinated in ginger, garlic, and red chillies"
      },
      {
        restaurant: restaurants[2]._id,
        name: "Crispy Chicken Nuggets",
        price: 199,
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
        category: "Chicken",
        description: "Golden crispy fried chicken bites served with dip"
      },
      {
        restaurant: restaurants[2]._id,
        name: "Chicken Salad",
        price: 239,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        category: "Salad",
        description: "Fresh crisp greens topped with grilled chicken strips"
      },
      {
        restaurant: restaurants[2]._id,
        name: "Garden Salad",
        price: 179,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        category: "Salad",
        description: "Mixed lettuce, cucumber, cherry tomatoes, and olive oil"
      },
      {
        restaurant: restaurants[2]._id,
        name: "Fruit Salad",
        price: 159,
        image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80",
        category: "Dessert",
        description: "Refreshing seasonal fresh fruits with honey lemon glaze"
      },
      {
        restaurant: restaurants[2]._id,
        name: "Chocolate Brownie",
        price: 189,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
        category: "Dessert",
        description: "Warm fudgy chocolate brownie topped with vanilla ice cream"
      },
      {
        restaurant: restaurants[0]._id,
        name: "Lemonade",
        price: 79,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
        category: "Drinks",
        description: "Freshly squeezed lemon juice with mint and ice"
      },
      {
        restaurant: restaurants[0]._id,
        name: "Iced Tea",
        price: 89,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
        category: "Drinks",
        description: "Chilled black tea brewed with fresh lemon slices"
      },
      {
        restaurant: restaurants[1]._id,
        name: "Cold Coffee",
        price: 99,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
        category: "Drinks",
        description: "Creamy iced cold brew coffee topped with chocolate syrup"
      },
      {
        restaurant: restaurants[1]._id,
        name: "Soda",
        price: 59,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
        category: "Drinks",
        description: "Sparkling fizzy refreshing carbonated drink"
      },
      {
        restaurant: restaurants[2]._id,
        name: "Mango Lassi",
        price: 119,
        image: "https://images.unsplash.com/photo-1571006682858-a4ce007698fa?auto=format&fit=crop&w=800&q=80",
        category: "Drinks",
        description: "Traditional sweet Indian mango yogurt smoothie"
      },
      {
        restaurant: restaurants[2]._id,
        name: "Caesar Salad",
        price: 199,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
        category: "Salad",
        description: "Romaine lettuce, garlic croutons, and shaved parmesan"
      },
      {
        restaurant: restaurants[0]._id,
        name: "Caprese Salad",
        price: 219,
        image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19655?auto=format&fit=crop&w=800&q=80",
        category: "Salad",
        description: "Fresh mozzarella, ripe tomatoes, basil, and balsamic reduction"
      },
      {
        restaurant: restaurants[1]._id,
        name: "Greek Salad",
        price: 189,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        category: "Salad",
        description: "Crisp cucumbers, tomatoes, Kalamata olives, and feta cheese"
      },
      {
        restaurant: restaurants[0]._id,
        name: "Tiramisu",
        price: 249,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
        category: "Dessert",
        description: "Classic Italian coffee-soaked ladyfingers with mascarpone cream"
      }
    ]);

    res.json({
      success: true,
      message: "Restaurant and menu data seeded successfully with dish photos."
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};