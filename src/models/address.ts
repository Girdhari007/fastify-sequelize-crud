import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const Address = sequelize.define("Address", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  street: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  city: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  state: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  pincode: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
}, {
  timestamps: true, // ✅ Sequelize manages createdAt & updatedAt
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});
