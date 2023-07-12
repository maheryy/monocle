import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Monocle API",
      version: "1.0.0",
      description: "Monocle API",
    },
  },
  apis: ["./src/routes/*.ts"],
});

const docsRouter: Router = Router();

docsRouter.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default docsRouter;
