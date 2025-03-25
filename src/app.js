import express from "express"
import cors from "cors"
import router from "./routes/user.route.js"
import swaggerUi from "swagger-ui-express"
import swaggerFile from './config/swagger-output.json' assert { type: 'json' };

const app = express()

//middlewares
app.use(cors())
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/user",router)

export default app