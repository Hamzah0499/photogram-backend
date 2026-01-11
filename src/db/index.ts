import { drizzle } from "drizzle-orm/mysql2";

// const db = drizzle(process.env.DATABASE_URL!);
export const db = drizzle(process.env.DATABASE_URL!);
