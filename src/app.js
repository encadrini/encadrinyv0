import express from "express"
import cors from "cors"
import router from "./routes/user.route.js"

const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use("/user",router)

export default app