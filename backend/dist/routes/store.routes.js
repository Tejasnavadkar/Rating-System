"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const store_controller_1 = __importDefault(require("../controllers/store.controller"));
const router = express_1.default.Router();
router.post('/createStore', authMiddleware_1.AuthCheckMiddleware, store_controller_1.default.createStoreController);
router.get('/getAllStores', authMiddleware_1.AuthCheckMiddleware, store_controller_1.default.getAllStoreController);
router.post('/rateStore', authMiddleware_1.AuthCheckMiddleware, store_controller_1.default.rateStoreController);
exports.default = router;
