import { Model } from "sequelize"

export interface UserTypes {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserAttributes extends UserTypes, Model {}