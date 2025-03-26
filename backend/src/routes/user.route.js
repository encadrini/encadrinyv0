// src/routes/user.route.js

import { Router } from "express";
import { register, login, getAllUsers } from "../controller/user.controller.js";

const router = Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "motdepasse"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */
router.post("/register", register);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Authentifier un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "motdepasse"
 *     responses:
 *       200:
 *         description: Connexion réussie
 */
router.post("/login", login);

/**
 * @swagger
 * /user/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     responses:
 *       200:
 *         description: Une liste d'utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: "johndoe"
 */
router.get("/users", getAllUsers);

export default router;
