import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

export const register = async (req,res) => {
    try {
        const {password,...rest} = req.body 
        const hashed = await bcrypt.hash(password,10) 
        const user = await prisma.user.create({
            data : {
                ...rest, 
                password : hashed
            }
        })
        res.status(201).json(user)

    } catch (error) {
        res.status(500).json({error : error.message})
        
    }
}