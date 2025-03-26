// src/routes/user.route.js

import express from "express";
import { register, login } from "../controller/user.controller.js";

const router = express.Router();

// Route d'inscription utilisateur
router.post("/register", register);

// Route de connexion utilisateur
router.post("/login", login);

export default router;
