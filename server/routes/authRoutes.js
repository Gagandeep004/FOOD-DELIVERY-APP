import express from "express";

import { login, register, updateProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put("/profile/:userId", updateProfile);

export default router;