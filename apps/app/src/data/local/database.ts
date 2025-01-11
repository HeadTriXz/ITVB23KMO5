import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as schema from "@/data/local/schema";

const sqlite = SQLite.openDatabaseSync("automaat.db", { enableChangeListener: true });

export const db = drizzle(sqlite, {
    casing: "snake_case",
    schema: schema
});
