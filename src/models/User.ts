import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { Product } from "./Product";
import { Sale } from "./Sell";
import { UserAttributes } from "../types/user";

/**
 * User model definition.
 */
export const User = sequelize.define<UserAttributes>("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
});

User.hasMany(Product, { 
  foreignKey: "userId",
  sourceKey: "id",
});

User.hasMany(Sale, {
    foreignKey: "userId",
    sourceKey: "id",
});

Product.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
Sale.belongsTo(User, { foreignKey: "userId", targetKey: "id" });