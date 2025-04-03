import express from "express"
import { fetchUsersByRole, login, register } from "../controller/user.controller.js";

const router = express.Router(); 

router.post("/signup",register) // post request 
router.post("/login",login) // post request 
router.get("/fetch-users/:role",fetchUsersByRole) // post request 

export default router 