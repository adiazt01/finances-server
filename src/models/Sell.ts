import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { product } from "./Product";

export const sell = sequelize.define("sells", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})

sell.belongsToMany(product, {through: "products_sell" })
product.belongsToMany(sell, { through: "products_sell"});