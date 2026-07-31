import Menu from "../models/Menu.js";

export const getRestaurantMenu = async (req, res) => {
  try {
    const menu = await Menu.find({
      restaurant: req.params.restaurantId,
    });

    res.json(menu);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();

    res.json(menus);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};