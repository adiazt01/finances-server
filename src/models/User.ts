import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { product } from "./Product";

export const user = sequelize.define("users", {
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

user.hasMany(product, {
  foreignKey: "userId",
  sourceKey: "id",
});

product.belongsTo(user, { foreignKey: "userId", targetKey: "id" });
