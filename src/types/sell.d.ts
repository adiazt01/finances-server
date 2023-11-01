import { Model } from "sequelize"

export interface sellTypes {
     id: string;
     productId: string;
     quantity: number;
     total: number;
     createdAt: Date;
     updatedAt: Date;
 }
 
 export interface sellAttributes extends sellTypes, Model {}