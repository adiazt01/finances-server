import { Model} from "sequelize";

export interface productTypes {
    id: string;
    name: string;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface productAttributes extends productTypes, Model {}