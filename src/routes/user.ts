import { FastifyInstance } from "fastify";
import * as associationsController from "../controllers/user";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import * as userController from "../controllers/user";
import {
  createUserBodySchema,
  updateUserBodySchema,
  idParamSchema,
  userResponseSchema,
  getUserResponseSchema,
  getAllUsersResponseSchema,
  createUserResponseSchema,
  createUsersResponseSchema,
  updateUserResponseSchema,
  deleteUserResponseSchema,
  getUsersWithAddressResponseSchema,
  getUserWithAddressResponseSchema,
} from "../schemas/user";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// Associations Routes
export async function associationsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get("/useraddress", {
    schema: {
      response: { 200: zodToJsonSchema(getUsersWithAddressResponseSchema) },
    }, handler: associationsController.getUserAddress
  });

  app.get("/useraddress/:id", {
    schema: {
      params: zodToJsonSchema(idParamSchema),
      response: { 200: zodToJsonSchema(getUserWithAddressResponseSchema) },
    },
    handler: associationsController.getUserAddressByID,
  });
}

// User Routes
export async function userRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  //Create a user
  app.post("/users", {
    schema: {
      body: zodToJsonSchema(createUserBodySchema),
      response: { 200: zodToJsonSchema(createUserResponseSchema) },
    },
    handler: userController.createUser,
  });

  // Get all users
  app.get("/users", {
    schema: {
      response: { 200: zodToJsonSchema(getAllUsersResponseSchema) },
    },
    handler: userController.getUsers
  });

  //Get user by ID
  app.get("/users/:id", {
    schema: {
      params: zodToJsonSchema(idParamSchema),
      response: { 200: zodToJsonSchema(getUserResponseSchema) },
    },
    handler: userController.getUser
  });

  // Update user by ID
  app.put("/users/:id", {
    schema: {
      params: zodToJsonSchema(idParamSchema),
      body: zodToJsonSchema(updateUserBodySchema),
      response: { 200: zodToJsonSchema(updateUserResponseSchema) },
    },
    handler: userController.updateUser,
  });

  //Delete user by ID
  app.delete("/users/:id", {
    schema: {
      params: zodToJsonSchema(idParamSchema),
      response: { 200: zodToJsonSchema(deleteUserResponseSchema) },
    },
    handler: userController.deleteUser,
  });

  //create users in bulk
  app.post("/users/batch", {
    schema: {
      body: zodToJsonSchema(z.array(createUserBodySchema)),
      response: { 200: zodToJsonSchema(createUsersResponseSchema) },
    },
    handler: userController.bulkCreateUsers
  });


}
