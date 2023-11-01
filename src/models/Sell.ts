import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Product } from "./Product";
import { sellAttributes } from "../types/sell";

export const Sale = sequelize.define<sellAttributes>("sells", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    ProductId: {
        type: DataTypes.UUID,
        allowNull: false,
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

Sale.belongsTo(Product, { foreignKey: 'ProductId' });
Product.hasMany(Sale, { foreignKey: 'ProductId' });