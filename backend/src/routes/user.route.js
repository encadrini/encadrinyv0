// src/routes/user.route.js

import { Router } from "express";
import { register, login, getAllUsers } from "../controller/user.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers); // 🔥 Ajout de l'endpoint GET

export default router;
