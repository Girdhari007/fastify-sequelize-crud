import fastify from "fastify";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db";
import { setupAssociations } from "./models/associations";
import { userRoutes } from "./routes/userRoutes";
import { addressRoutes } from "./routes/addressRoutes";

dotenv.config();
const app = fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

app.register(userRoutes);
app.register(addressRoutes);

const start = async () => {
  await connectDB();
  setupAssociations();
  await sequelize.sync({ force: true });

  app.get("/", async () => {
  return { message: "Welcome to the Fastify + Sequelize CRUD API 🚀" };
});

  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

start();
