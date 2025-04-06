import express from "express"

import { create, deleteProject, fetchProject, fetchProjects, updateProject } from "../controller/project.controller.js";

const router = express.Router(); 

router.post("/",create) // post request 
router.get("/",fetchProjects) // get request 
router.get("/:id",fetchProject) // get one request 
router.patch("/:id",updateProject) // patch request 
router.delete("/:id",deleteProject) // delete request 


export default router 