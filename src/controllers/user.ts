import { FastifyReply, FastifyRequest } from "fastify";
import * as userService from "../services/user";
import * as userAddress from "../services/user";

import { success, failure } from "../utils/response";

//user with addresses
export const getUserAddress = async (_req: FastifyRequest, reply: FastifyReply) => {
  const users = await userAddress.getAllUserAddress();
  if (!users) return reply.status(404).send(failure("User addresses not found"));
  reply.send(success("Users fetched successfully", users));
};

export const getUserAddressByID = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as any;
  const user = await userAddress.getUserAddressById(id);
  if (!user) return reply.status(404).send(failure("User address not found"));
  reply.send(success("User address fetched", user));
};

// Create a user
export const createUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await userService.createUser(req.body);
    reply.send(success("User created successfully", user));
  } catch (err) {
    reply.status(500).send(failure("Error creating user", err));
  }
};

// Get all users
export const getUsers = async (_req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await userService.getAllUsers();
    reply.send(success("Users fetched successfully", users));
  } catch (err) {
    return reply.status(404).send(failure("Error fetching users", err));
  }
};

// Get user by ID
export const getUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as any;
  const user = await userService.getUserById(id);
  if (!user) return reply.status(404).send(failure("User not found"));
  reply.send(success("User fetched", user));
};

export const updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as any;
  const updated = await userService.updateUser(id, req.body);
  if (!updated) return reply.status(404).send(failure("User not found"));
  reply.send(success("User updated", updated));
};

// Delete user
export const deleteUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as any;
  const deleted = await userService.deleteUser(id);
  if (!deleted) return reply.status(404).send(failure("User not found"));
  reply.send(success("User deleted"));
};

// Bulk create users
export const bulkCreateUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = req.body as any[];
    if (!Array.isArray(users)) {
      return reply.code(400).send(failure("Payload must be an array of users"));
    }
    const created = await userService.bulkCreateUsers(users);
    reply.send(success("Users created successfully", created));
  } catch (err: any) {
    reply.status(500).send(failure("Error creating users", err));
  }
};
