"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// enum Role {
//     USER,
//     ADMIN,
//     OWNER
// }
// interface signupType {
//   name : String,
//   email : String, 
//   password : String,
//   address : String,
//   role : Role,
//   stores : Store[]
//   ratings : Rating[]
// }
exports.signupSchema = zod_1.default.object({
    name: zod_1.default.string().min(20).max(60),
    email: zod_1.default.email(),
    password: zod_1.default.string().min(8).max(16).refine(val => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
    })
        .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: "Password must contain at least one special character",
    }), // at least one uppercase letter and one special character.
    address: zod_1.default.string().optional(),
    role: zod_1.default.enum(['USER', 'ADMIN', 'OWNER']).optional(),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string().min(8),
});
