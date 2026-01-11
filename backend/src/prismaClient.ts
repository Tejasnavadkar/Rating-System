// import { PrismaClient } from "./generated/prisma";
import { PrismaClient } from '@prisma/client'

declare global {  // declare the global type declare global runtime ka nahi, sirf TypeScript ko samjhane ke liye 
  // allow global caching in dev (HMR)
  var __prisma: PrismaClient | undefined;
}

const options: ConstructorParameters<typeof PrismaClient>[0] = {
  datasources: {
    db: {
      url: process.env.PRISMA_ACCELERATE_URL || process.env.DATABASE_URL,
    },
  },
};

const prisma = global.__prisma ?? new PrismaClient(options); // Dev mode mein DB connection explosion se bachata hai

if (process.env.NODE_ENV !== "production") global.__prisma = prisma;  // store instance in global cache to prevent multiple db connections

export default prisma;