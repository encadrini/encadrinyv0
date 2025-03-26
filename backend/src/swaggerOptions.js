// src/swaggerOptions.js

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mon API",
      version: "1.0.0",
      description: "Documentation de mon API Express avec Swagger",
    },
    servers: [
      {
        url: "http://localhost:3100",
      },
      {
        url: "http://92.222.25.73:3100/",
      },
    ],
  },
  // Chemin vers les fichiers contenant la documentation via les commentaires JSDoc
  apis: ["./src/routes/*.js", "./src/models/*.js"],
};

export default options;
