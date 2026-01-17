"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zodTypes_1 = require("../utils/zodTypes");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const hashPassword_1 = require("../utils/hashPassword");
const auth_Services_1 = require("../services/auth.Services");
const jwtHandler_1 = require("../utils/jwtHandler");
const comparePassword_1 = require("../utils/comparePassword");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password, address, role } = req.body;
        const result = zodTypes_1.signupSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.flatten() });
        }
        const isUserExist = yield prismaClient_1.default.user.findUnique({ where: {
                email: email
            } });
        const hashedPassword = yield (0, hashPassword_1.HashPassword)(password);
        if (isUserExist) {
            return res.status(403).json({ message: 'user already exist' });
        }
        const payload = {
            name: name,
            email: email,
            hashedPassword: hashedPassword,
            address: address,
            role: role
        };
        // db call
        const createdUser = yield (0, auth_Services_1.createUser)(payload);
        if (!createdUser) {
            return res.status(401).json({
                message: 'unable to create user'
            });
        }
        const jwtPayload = {
            id: createdUser.id,
            email: createdUser.email
        };
        // todo : generate token
        const jwtToken = (0, jwtHandler_1.generateJwt)(jwtPayload);
        console.log(createdUser);
        res.status(200).json({
            msg: "user Created..",
            user: createdUser,
            jwtToken
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("error in signupController:--", error);
            return res.status(500).json({
                message: 'Error while signup',
                error: error.message
            });
        }
        else {
            throw new Error(String(error));
        }
    }
});
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = zodTypes_1.loginSchema.safeParse(body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.flatten() });
        }
        const isUserExist = yield prismaClient_1.default.user.findUnique({ where: {
                email: body.email
            } });
        if (!isUserExist) {
            return res.status(403).json({ message: 'wrong credentials' });
        }
        const hashedPassword = isUserExist.password;
        const isMatch = yield (0, comparePassword_1.comparePassword)(hashedPassword, body.password);
        if (!isMatch) {
            return res.status(403).json({ message: 'wrong credentials' });
        }
        const jwtPayload = {
            id: isUserExist.id,
            email: isUserExist.email
        };
        const jwtToken = (0, jwtHandler_1.generateJwt)(jwtPayload);
        res.status(200).json({
            msg: "user logedIn..",
            user: isUserExist,
            jwtToken
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("error in signupController:--", error);
            return res.status(500).json({
                message: 'Error while login',
                error: error.message
            });
        }
        else {
            throw new Error(String(error));
        }
    }
});
exports.default = {
    signupController,
    loginController
};
