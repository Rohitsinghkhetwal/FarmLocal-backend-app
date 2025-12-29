"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedProducts = getCachedProducts;
exports.setCachedProducts = setCachedProducts;
const redis_1 = require("../config/redis");
async function getCachedProducts(key) {
    const cached = await redis_1.redis.get(key);
    return cached ? JSON.parse(cached) : null;
}
async function setCachedProducts(key, data) {
    await redis_1.redis.set(key, JSON.stringify(data), {
        EX: 60 // seconds
    });
}
