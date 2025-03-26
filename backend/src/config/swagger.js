// const swaggerAutogen = require("swagger-autogen")();
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Documentation",
    description: "توثيق API بطريقة تلقائية بدون YAML أو تعليقات كثيرة",
    version: "1.0.0",
  },
  host: "localhost:3100",
  schemes: ["http"],
  tags: [
    { name: "Users", description: "إدارة المستخدمين" }
  ]
};

const outputFile = "./swagger-output.json";
const routes = ["../app.js"]; 

swaggerAutogen(outputFile, routes, doc);
