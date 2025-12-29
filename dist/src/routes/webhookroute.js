"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiB_1 = require("../../external/apiB");
const router = express_1.default.Router();
router.post("/", apiB_1.webhookApi);
exports.default = router;
