"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get('/getUser', authMiddleware_1.AuthCheckMiddleware, user_controller_1.default.getUserController);
router.get('/getAllUsers', authMiddleware_1.AuthCheckMiddleware, user_controller_1.default.getAllUsersController);
router.post('/verifyEmail', user_controller_1.default.verifyMailController);
router.post('/resetPassword', user_controller_1.default.resetPasswordController);
router.get('/getUserById/:id', authMiddleware_1.AuthCheckMiddleware, user_controller_1.default.getUserByIdController);
exports.default = router;
