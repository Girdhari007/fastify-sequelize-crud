import fastify from "fastify";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db";
import { userRoutes } from "./routes/userRoutes";
import { addressRoutes } from "./routes/addressRoutes";
import { associationsRoutes } from "./routes/associations";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

dotenv.config();
const app = fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.DB_HOST;

const start = async () => {
  // Register Swagger with all schemas
  await app.register(swagger, {
    swagger: {
      info: {
        title: 'Fastify API',
        version: '1.0.0'
      },
      consumes: ['application/json'],
      produces: ['application/json']
    }
  });

  // Register Swagger UI
  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    }
  });

  // Register route plugins
  await app.register(userRoutes);
  await app.register(addressRoutes);
  await app.register(associationsRoutes);

  await connectDB();
  await sequelize.sync();

  app.get("/", async () => ({ message: "Welcome to the Fastify + Sequelize CRUD API" }));

  try {
    await app.listen({ port: PORT });
    console.log(`Server running at http://${HOST}:${PORT}`);
    console.log(`API Documentation available at http://${HOST}:${PORT}/docs`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
