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
const hashPassword_1 = require("../utils/hashPassword");
const store_Services_1 = require("../services/store.Services");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const createStoreController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = zodTypes_1.storeSchema.safeParse(body);
        if (!result.success) {
            return res.status(400).json({
                error: result.error.flatten()
            });
        }
        //check if Store Name already exist
        const storeNameExist = yield prismaClient_1.default.store.findUnique({
            where: {
                name: body.StoreName
            }
        });
        if (storeNameExist) {
            return res.status(400).json({
                message: 'store name already exists'
            });
        }
        //check if store already exist
        const storeExist = yield prismaClient_1.default.store.findUnique({
            where: {
                email: body.StoreEmail
            }
        });
        if (storeExist) {
            return res.status(400).json({
                message: 'store already exists'
            });
        }
        //check if owner already exist
        const ownerExist = yield prismaClient_1.default.store.findUnique({
            where: {
                email: body.OwnerEmail
            }
        });
        if (ownerExist) {
            return res.status(400).json({
                message: 'owner already exists'
            });
        }
        const ownerHashPassword = yield (0, hashPassword_1.HashPassword)(body.OwnerPassword);
        //    create store with user(owner)
        const storePayload = {
            StoreName: body.StoreName,
            StoreEmail: body.StoreEmail,
            StoreAddress: body.StoreAddress,
            OwnerName: body.OwnerName,
            OwnerEmail: body.OwnerEmail,
            OwnerPassword: ownerHashPassword,
            OwnerAddress: body.OwnerAddress
        };
        const createStore = yield (0, store_Services_1.createStoreWithOwner)(storePayload);
        return res.status(201).json({
            message: 'Store created successfully',
            store: createStore
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: 'Error while store creation',
                error: error.message
            });
        }
        else {
            throw new Error(String(error));
        }
    }
});
const getAllStoreController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = typeof req.query.filter == 'string' ? req.query.filter : "";
        const allStore = yield prismaClient_1.default.store.findMany({
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
            stores: allStore
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: 'Error while store creation',
                error: error.message
            });
        }
        else {
            throw new Error(String(error));
        }
    }
});
exports.default = {
    createStoreController,
    getAllStoreController
};
