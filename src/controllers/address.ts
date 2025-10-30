import { FastifyReply, FastifyRequest } from "fastify";
import * as addressService from "../services/address";
import { success, failure } from "../utils/response";

export const createAddress = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const address = await addressService.createAddress(req.body);
    reply.send(success("Address created successfully", address));
  } catch (err) {
    reply.status(500).send(failure("Error creating address", err));
  }
};

export const getAddresses = async (req: FastifyRequest, reply: FastifyReply) => {
  const { pincode } = req.query as any;
  const filter = pincode ? { pincode } : {};
  const addresses = await addressService.getAllAddresses();
  reply.send(success("Addresses fetched", addresses));
};

export const getAddress = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as any;
  const address = await addressService.getAddressById(id);
  if (!address) return reply.status(404).send(failure("Address not found"));
  reply.send(success("Address fetched", address));
};

export const updateAddress = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as any;
  const updated = await addressService.updateAddress(id, req.body);
  if (!updated) return reply.status(404).send(failure("Address not found"));
  reply.send(success("Address updated", updated));
};

export const deleteAddress = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as any;
  const deleted = await addressService.deleteAddress(id);
  if (!deleted) return reply.status(404).send(failure("Address not found"));
  reply.send(success("Address deleted"));
};
//for bulk address creation
export const bulkCreateAddresses = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const addresses = req.body as any[];
    if (!Array.isArray(addresses)) {
      return reply.code(400).send(failure("Payload must be an array of addresses"));
    }
    const created = await addressService.bulkCreateAddresses(addresses);
    reply.send(success("Addresses created successfully", created));
  } catch (err: any) {
    reply.status(500).send(failure("Error creating addresses", err));
  }
};
