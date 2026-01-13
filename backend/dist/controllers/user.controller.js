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
// const getUserById = async (req,res) => {
// }
exports.default = {
    getUserController,
    getAllUsersController
};
