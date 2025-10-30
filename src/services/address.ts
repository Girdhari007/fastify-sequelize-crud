import { Address } from "../models/address";

export const createAddress = (data: any) => Address.create(data);
export const getAllAddresses = () => Address.findAll();
export const getAddressById = (id: number) => Address.findByPk(id);
export const updateAddress = async (id: number, data: any) => {
  const address = await Address.findByPk(id);
  if (!address) return null;
  return address.update(data);
};
export const deleteAddress = async (id: number) => {
  const address = await Address.findByPk(id);
  if (!address) return null;
  await address.destroy();
  return true;
};
//for bulk address creation
export const bulkCreateAddresses = async (addresses: any[]) => {
  return Address.bulkCreate(addresses);
};
