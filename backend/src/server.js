// src/server.js

import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
