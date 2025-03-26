import express from "express"
import cors from "cors"
import routerUser from "./routes/user.route.js"
import routerProject from "./routes/project.router.js"
import swaggerUi from "swagger-ui-express"
import swaggerFile from './config/swagger-output.json' with { type: 'json' };

const app = express()

//middlewares
app.use(cors())
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/user",routerUser)
app.use("/project",routerProject)

export default app