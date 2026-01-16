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
const prismaClient_1 = __importDefault(require("../prismaClient"));
const getAllRatingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRatings = yield prismaClient_1.default.rating.findMany({});
        return res.status(201).json({
            msg: 'all ratings',
            allRatings
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ msg: error.message });
        }
        else {
            return res.status(500).json({ msg: String(error) });
        }
    }
});
const getRatingByUserIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const allRatings = yield prismaClient_1.default.rating.findMany({
            where: {
                userId: userId
            }
        });
        return res.status(201).json({
            msg: 'all ratings',
            allRatings
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ msg: error.message });
        }
        else {
            return res.status(500).json({ msg: String(error) });
        }
    }
});
exports.default = {
    getAllRatingController,
    getRatingByUserIdController
};
