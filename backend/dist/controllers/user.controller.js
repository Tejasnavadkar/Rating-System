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
const user_Services_1 = require("../services/user.Services");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const hashPassword_1 = require("../utils/hashPassword");
const zodTypes_1 = require("../utils/zodTypes");
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; // from middleware
        if (!userId) {
            return res.status(404).json({ message: 'userId not found' });
        }
        const user = yield (0, user_Services_1.getUserById)(userId);
        if (!user) {
            return res.status(401).json({
                message: 'user not found'
            });
        }
        return res.status(201).json({
            user: user
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("getUserController-", error.message);
            return res.status(500).json({
                message: 'Error getting user',
                error: error.message
            });
        }
        else {
            throw new Error(String(error));
        }
    }
});
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = typeof req.query.filter === 'string' ? req.query.filter : "";
        const allUsers = yield prismaClient_1.default.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: filter,
                            mode: 'insensitive'
                        }
                    },
                    {
                        email: {
                            contains: filter,
                            mode: 'insensitive'
                        }
                    },
                    {
                        address: {
                            contains: filter,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                address: true,
                role: true,
                ratings: true,
                stores: true
            }
        });
        return res.status(201).json({
            user: allUsers
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("getAllUserController-", error.message);
            return res.status(500).json({
                message: 'Error getting users',
                error: error.message
            });
        }
        else {
            throw new Error(String(error));
        }
    }
});
const verifyMailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const isuserExist = yield prismaClient_1.default.user.findUnique({
            where: {
                email: email
            }
        });
        if (!isuserExist) {
            return res.status(404).json({
                msg: 'email not exist'
            });
        }
        return res.status(201).json({
            msg: 'email verified successfully'
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("verifymail-", error.message);
            return res.status(500).json({
                message: 'Error verifing user email',
                error: error.message
            });
        }
        else {
            throw new Error(String(error));
        }
    }
});
const resetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPassword } = req.body;
        const result = zodTypes_1.resetPasswordSchema.safeParse({
            email: email,
            password: newPassword
        });
        if (!result.success) {
            return res.status(400).json({
                msg: result.error.flatten()
            });
        }
        const user = yield prismaClient_1.default.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(404).json({
                msg: 'email not exist'
            });
        }
        const hashedPassword = yield (0, hashPassword_1.HashPassword)(newPassword);
        const updatedUser = yield prismaClient_1.default.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedPassword
            }
        });
        return res.status(201).json({
            message: 'password updated successfully',
            updatedUser
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("resetPasswordController-", error.message);
            return res.status(500).json({
                message: 'Error reset password',
                error: error.message
            });
        }
        else {
            throw new Error(String(error));
        }
    }
});
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(404).json({
                msg: "user not found"
            });
        }
        const user = yield prismaClient_1.default.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        if (!user) {
            return res.status(404).json({
                msg: 'user not found'
            });
        }
        return res.status(200).json({
            user
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                msg: error.message
            });
        }
        else {
            throw new Error(String(error));
        }
    }
});
exports.default = {
    getUserController,
    getAllUsersController,
    verifyMailController,
    resetPasswordController,
    getUserByIdController
};
