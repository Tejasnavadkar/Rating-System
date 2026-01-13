"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// interface
const generateJwt = (jwtPayload) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error(`jwt not find`);
        }
        const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET);
        return token;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("error while:--", error);
            throw new Error(error.message);
        }
        else {
            throw new Error(String(error));
        }
    }
};
exports.generateJwt = generateJwt;
const verifyToken = (token) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error(`jwt not find`);
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('err in verify token', error);
            throw new Error(error.message);
        }
        else {
            throw new Error(String(error));
        }
    }
};
exports.verifyToken = verifyToken;
