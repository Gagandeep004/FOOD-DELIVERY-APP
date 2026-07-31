import express from "express";
import { getRestaurantMenu, getAllMenus } from "../controllers/menuController.js";

const router = express.Router();
router.get("/", getAllMenus);
router.get("/:restaurantId", getRestaurantMenu);

export default router;