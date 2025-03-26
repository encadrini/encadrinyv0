// src/swaggerOptions.js

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ENCADRINY API",
      version: "1.0.0",
      description: "Documentation de l'API de l'application Encadriny",
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
