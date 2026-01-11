"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// import { PrismaClient } from "./generated/prisma";
const client_1 = require("@prisma/client");
const options = {
    datasources: {
        db: {
            url: process.env.PRISMA_ACCELERATE_URL || process.env.DATABASE_URL,
        },
    },
};
const prisma = (_a = global.__prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient(options); // Dev mode mein DB connection explosion se bachata hai
if (process.env.NODE_ENV !== "production")
    global.__prisma = prisma; // store instance in global cache to prevent multiple db connections
exports.default = prisma;
