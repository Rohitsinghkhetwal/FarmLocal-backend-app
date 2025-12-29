"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = getAccessToken;
const axios_1 = __importDefault(require("axios"));
const redis_1 = require("../config/redis");
const redislock_1 = require("../utils/redislock");
const TOKEN_KEY = "oauth:token";
async function getAccessToken() {
    const cached = await redis_1.redis.get(TOKEN_KEY);
    if (cached)
        return cached;
    await (0, redislock_1.withRedisLock)("oauth:lock", 5, async () => {
        const recheck = await redis_1.redis.get(TOKEN_KEY);
        if (recheck)
            return;
        const res = await axios_1.default.post(process.env.OAUTH_TOKEN_URL, {
            grant_type: "client_credentials",
            client_id: process.env.OAUTH_CLIENT_ID,
            client_secret: process.env.OAUTH_CLIENT_SECRET,
        });
        const { access_token, expires_in } = res.data;
        // await redis.set(TOKEN_KEY, access_token, expires_in - 30)
        await redis_1.redis.set(TOKEN_KEY, access_token, {
            EX: Number(expires_in) - 30,
        });
    });
    return (await redis_1.redis.get(TOKEN_KEY));
}
