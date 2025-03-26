// src/app.js

import express from "express";
import cors from "cors";
import router from "./routes/user.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./swaggerOptions.js";

const app = express();

// Initialiser swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
