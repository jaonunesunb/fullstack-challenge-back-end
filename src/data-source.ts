import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Contact } from "../src/entities/Contact";
import "dotenv/config";
import { InitialMigration1683519885466 } from "./migrations/1683519885466-InitialMigration";


const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/**/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.PGHOST!,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER!,
        password: process.env.PGPASSWORD!,
        database: process.env.PGDATABASE!,
        logging: true,
        synchronize: false,
        entities: [User, Contact],
        migrations: [InitialMigration1683519885466],
      }
);

export default AppDataSource;
