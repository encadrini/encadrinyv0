import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

export const create = async (req, res) => {
  try {
    const { title, description,userId  } = req.body;

    const project = await prisma.project.create({
      data: {title, description,userId},
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({});

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
