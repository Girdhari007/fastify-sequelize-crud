import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
  timestamps: true, // ✅ ensures valid timestamps
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});
