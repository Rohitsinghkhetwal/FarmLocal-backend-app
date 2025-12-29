"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExternalProducts = fetchExternalProducts;
const axios_1 = __importDefault(require("axios"));
const retry_1 = require("../utils/retry");
async function fetchExternalProducts() {
    return (0, retry_1.retry)(async () => {
        const res = await axios_1.default.get(process.env.API_URL, { timeout: 2000 });
        return res.data;
    });
}
