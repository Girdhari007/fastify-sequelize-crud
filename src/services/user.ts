import { User } from "../models/user";
import { Address } from "../models/address";

export const getAllUserAddress = () => User.findAll({
  include: { model: Address, as: "addresses" }
}
);
export const getUserAddressById = (id: number) =>
  User.findByPk(id, { include: { model: Address, as: "addresses" } });

export const createUser = (data: any) => User.create(data);
export const getAllUsers = () => User.findAll();
export const getUserById = (id: number) => User.findByPk(id);
export const updateUser = async (id: number, data: any) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  return user.update(data);
};
export const deleteUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return true;
};

//for bulk user creation
export const bulkCreateUsers = async (users: any[]) => {
  return User.bulkCreate(users);
};