import { Sequelize } from "sequelize";

export const sequelize: Sequelize = new Sequelize(process.env.DATABASE_URL!, {
    logging: (...msg) => console.log(msg), // Displays all log function call parameters
})
