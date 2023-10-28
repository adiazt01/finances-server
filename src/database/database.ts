import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "store_db",
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);
