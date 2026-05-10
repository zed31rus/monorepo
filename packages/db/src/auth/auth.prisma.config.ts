import { defineConfig, env } from "prisma/config";
import 'dotenv/config';

export default defineConfig({
  schema: "./auth.schema.prisma",
  migrations: {
    path: "./migrations",
  },
  datasource: {
    url: env('DATABASE_URL')
  },
});
