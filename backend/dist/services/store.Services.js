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
exports.createStoreWithOwner = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
// interface dataType {
// }
const createStoreWithOwner = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { StoreName, StoreEmail, StoreAddress, OwnerName, OwnerEmail, OwnerPassword, OwnerAddress } = data;
        const createdStore = yield prismaClient_1.default.store.create({
            data: {
                name: StoreName,
                email: StoreEmail,
                address: StoreAddress,
                owner: {
                    create: {
                        name: OwnerName,
                        email: OwnerEmail,
                        password: OwnerPassword,
                        address: OwnerAddress,
                        role: "OWNER"
                    }
                }
            },
        });
        return createdStore;
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
exports.createStoreWithOwner = createStoreWithOwner;
