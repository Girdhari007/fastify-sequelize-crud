import { User } from "./user";
import { Address } from "./address";

export const setupAssociations = () => {
  User.hasMany(Address, { foreignKey: "userId", as: "addresses" });
  Address.belongsTo(User, { foreignKey: "userId", as: "user" });
};
