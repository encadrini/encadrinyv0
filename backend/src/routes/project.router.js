import express from "express"

import { create, fetchProjects } from "../controller/project.controller.js";

const router = express.Router(); 

router.post("/",create) // post request 
router.get("/",fetchProjects) // post request 


export default router 