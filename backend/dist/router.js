"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const store_routes_1 = __importDefault(require("./routes/store.routes"));
const rating_routes_1 = __importDefault(require("./routes/rating.routes"));
const router = express_1.default.Router();
router.use("/api/auth", auth_routes_1.default);
router.use("/api/user", user_routes_1.default);
router.use("/api/store", store_routes_1.default);
router.use("/api/rating", rating_routes_1.default);
exports.default = router;
