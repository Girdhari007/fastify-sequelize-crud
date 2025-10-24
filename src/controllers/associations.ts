import { FastifyReply, FastifyRequest } from "fastify";
import * as userAddress from "../services/associations";
import { success, failure } from "../utils/response";

export const getUserAddress = async (_req: FastifyRequest, reply: FastifyReply) => {
    const users = await userAddress.getAllUserAddress();
    reply.send(success("Users fetched successfully", users));
};

export const getUserAddressByID = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as any;
    const user = await userAddress.getUserAddressById(id);
    if (!user) return reply.status(404).send(failure("User address not found"));
    reply.send(success("User address fetched", user));
};