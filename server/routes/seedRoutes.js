import express from "express";
import { seedRestaurants } from "../controllers/seedController.js";

const router = express.Router();

router.get("/", seedRestaurants);

export default router;