import "dotenv/config";
import { Sequelize } from "sequelize";

const db = new Sequelize(
    process.env.DB_NAME || "db",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "root",
    {
        dialect: "mysql",
        host: process.env.DB_HOST,
    }
);

export default db;
