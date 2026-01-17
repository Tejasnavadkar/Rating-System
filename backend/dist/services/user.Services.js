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
exports.getUserById = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prismaClient_1.default.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                address: true,
                role: true,
                ratings: {
                    select: {
                        id: true,
                        value: true,
                        storeId: true,
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                stores: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        address: true,
                        ratings: {
                            select: {
                                id: true,
                                value: true,
                                storeId: true,
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                        address: true
                                    }
                                }
                            }
                        },
                        overAllRating: true
                    }
                },
            }
        });
        return user;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error(String(error));
        }
    }
});
exports.getUserById = getUserById;
