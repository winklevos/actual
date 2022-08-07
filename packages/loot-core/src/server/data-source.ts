import "reflect-metadata"
import { DataSource } from "typeorm"
import { Bank } from "./entity/Bank"

export const AppDataSource = new DataSource({
    type: "sqlite",
    // host: "localhost",
    // port: 5432,
    // username: "test",
    // password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Bank],
    migrations: [],
    subscribers: [],
})
