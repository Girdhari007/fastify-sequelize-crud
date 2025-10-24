import { FastifyInstance } from "fastify";
import * as userController from "../controllers/userController";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users", userController.createUser);
  fastify.get("/users", userController.getUsers);
  fastify.get("/users/:id", userController.getUser);
  fastify.put("/users/:id", userController.updateUser);
  fastify.delete("/users/:id", userController.deleteUser);
}
