import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { password, email, username, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        role,
        username,
        password: hashed,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    const hashed = await bcrypt.hash(password, bcrypt.genSaltSync());

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(400).send("wrong email");
    }

    if (bcrypt.compareSync(password, hashed)) res.status(201).json(user);
    else {
      res.status(400).send("wrong password");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const fetchUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    let where = {};
    if (role) where = { ...where, role };

    const user = await prisma.user.findMany({
      where,
      select: {
        id:true,
        email:true,
        username:true,
        role:true,
      },
    });
    if (!user) {
      res.status(400).send("wrong email");
    }

     res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
