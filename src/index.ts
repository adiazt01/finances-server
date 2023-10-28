import { app } from "./app";
import dotenv from "dotenv";
import { sequelize } from "./database/database";

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
})();

dotenv.config({ path: "./config/.env" });

app.listen(process.env.PORT, () => {
  console.log("Server running on", process.env.PORT);
});
