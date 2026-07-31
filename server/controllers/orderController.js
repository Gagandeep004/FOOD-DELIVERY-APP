import Order from "../models/Order.js";
import User from "../models/User.js";

export const placeOrder = async (req, res) => {
  try {
    const deliveryPartners = await User.find({ role: "delivery" });

    const deliveryPartner =
      deliveryPartners.length > 0
        ? deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)]
        : null;

    const order = await Order.create({
      ...req.body,
      deliveryPartner: deliveryPartner ? deliveryPartner._id : null,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};