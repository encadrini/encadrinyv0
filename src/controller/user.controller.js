// src/controller/user.controller.js

import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    // console.log("Request body:", req.body);
    const { password, role, ...rest } = req.body;
    // console.log("Data without password:", rest);

    // Validate required fields
    if (!rest.username || !rest.email) {
      return res.status(400).json({ error: "Username and email are required" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: rest.email,
      },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        ...rest,
        password: hashed,
        role: role || "ETUDIANT", // Explicitly set role, defaulting to ETUDIANT
      },
      // Exclude password from the response
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        //createdAt: true,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Registration error:", error);

    // Handle specific Prisma errors
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

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Remove password before sending user data
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
