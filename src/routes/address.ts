import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import * as addressController from "../controllers/address";
import {
  createAddressBodySchema,
  updateAddressBodySchema,
  idParamSchema,
  createAddressResponseSchema,
  getAllAddressesResponseSchema,
  getAddressResponseSchema,
  updateAddressResponseSchema,
  deleteAddressResponseSchema,
  createAddressesBatchResponseSchema,
} from "../schemas/address";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";

export async function addressRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  // Create Address
  app.post("/addresses", {
    schema: {
      body: zodToJsonSchema(createAddressBodySchema),
      response: { 201: zodToJsonSchema(createAddressResponseSchema) },
    },
    handler: addressController.createAddress,
  });

  // Get All Addresses
  app.get("/addresses", {
    schema: {
      response: { 200: zodToJsonSchema(getAllAddressesResponseSchema) },
    },
    handler: addressController.getAddresses,
  });

  // Get Address by ID
  app.get("/addresses/:id", {
    schema: {
      params: zodToJsonSchema(idParamSchema),
      response: { 200: zodToJsonSchema(getAddressResponseSchema) },
    },
    handler: addressController.getAddress,
  });

  // Update Address by ID
  app.put("/addresses/:id", {
    schema: {
      params: zodToJsonSchema(idParamSchema),
      body: zodToJsonSchema(updateAddressBodySchema),
      response: { 200: zodToJsonSchema(updateAddressResponseSchema) },
    },
    handler: addressController.updateAddress,
  });

  // Delete Address by ID
  app.delete("/addresses/:id", {
    schema: {
      params: zodToJsonSchema(idParamSchema),
      response: { 200: zodToJsonSchema(deleteAddressResponseSchema) },
    },
    handler: addressController.deleteAddress,
  });

  // Create Multiple Addresses (Batch)
  app.post("/addresses/batch", {
    schema: {
      body: zodToJsonSchema(z.array(createAddressBodySchema)),
      response: { 200: zodToJsonSchema(createAddressesBatchResponseSchema) },
    },
    handler: addressController.bulkCreateAddresses,
  });
}
