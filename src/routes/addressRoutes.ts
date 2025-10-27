import { FastifyInstance } from "fastify";
import * as addressController from "../controllers/addressController";

export async function addressRoutes(fastify: FastifyInstance) {
  fastify.post("/addresses", addressController.createAddress);
  fastify.post("/addresses/batch", addressController.bulkCreateAddresses);
  fastify.get("/addresses", addressController.getAddresses);
  fastify.get("/addresses/:id", addressController.getAddress);
  fastify.put("/addresses/:id", addressController.updateAddress);
  fastify.delete("/addresses/:id", addressController.deleteAddress);
}
