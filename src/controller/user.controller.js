import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

export const register = async (req,res) => {
    try {
        console.log(req.body),"this is the body"
        const {password,...rest} = req.body 
        console.log(rest,"this is the rest")
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