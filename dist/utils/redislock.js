"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRedisLock = withRedisLock;
const redis_1 = require("../config/redis");
async function withRedisLock(key, ttl, fn) {
    const lock = await redis_1.redis.set(key, "1", {
        NX: true,
        EX: ttl,
    });
    if (!lock)
        return null;
    try {
        return await fn();
    }
    finally {
        await redis_1.redis.del(key);
    }
}
