import { User } from "../models/user";
import { Address } from "../models/address";

export const getAllUserAddress = () => User.findAll({
    include: { model: Address, as: "addresses" }
}
);
export const getUserAddressById = (id: number) =>
    User.findByPk(id, { include: { model: Address, as: "addresses" } });