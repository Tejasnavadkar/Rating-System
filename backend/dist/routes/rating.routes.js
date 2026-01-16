"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const rating_controller_1 = __importDefault(require("../controllers/rating.controller"));
const router = express_1.default.Router();
router.get('/getAllRatings', authMiddleware_1.AuthCheckMiddleware, rating_controller_1.default.getAllRatingController);
router.get('/getAllRatingsByUserId', authMiddleware_1.AuthCheckMiddleware, rating_controller_1.default.getRatingByUserIdController);
exports.default = router;
