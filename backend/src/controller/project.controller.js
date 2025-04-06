import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

export const create = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await prisma.project.create({
      data: { title, description },
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
export const fetchProject = async (req, res) => {
  try {
    const id=req.params.id
    const projects = await prisma.project.findUnique({where:{id}});

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const params = req.params.id;
    console.log(params);
    
    const projects = await prisma.project.update({
      where: {
        id: params,
      },
      data:{title,description},
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const id=req.params.id
    const projects = await prisma.project.delete({where:{id}});

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
