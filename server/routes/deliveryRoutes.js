import express from "express";
import {
  getAssignedOrders,
  updateOrderStatus,
} from "../controllers/deliveryController.js";

const router = express.Router();

router.get("/:partnerId/orders", getAssignedOrders);

router.put("/order/:orderId/status", updateOrderStatus);

export default router;