// src/controller/user.controller.js

import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { password, role, ...rest } = req.body;

    if (!rest.username || !rest.email) {
      return res.status(400).json({ error: "Username and email are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: rest.email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        ...rest,
        password: hashed,
        role: role || "ETUDIANT",
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "A user with this email already exists" });
    }

    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
