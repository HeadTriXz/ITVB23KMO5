import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    driver: "expo",
    schema: "./src/data/local/schema.ts",
    out: "./src/data/local/migrations",
    casing: "snake_case"
});
