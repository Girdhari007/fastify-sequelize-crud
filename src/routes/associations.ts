import { FastifyInstance } from "fastify";
import * as associationsController from "../controllers/associations";

export async function associationsRoutes(fastify: FastifyInstance) {
    fastify.get("/useraddress", associationsController.getUserAddress);
    fastify.get("/useraddress/:id", associationsController.getUserAddressByID);
}
