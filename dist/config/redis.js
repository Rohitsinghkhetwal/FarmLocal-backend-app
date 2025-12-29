"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "./.env"
});
exports.redis = (0, redis_1.createClient)({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
exports.redis.on("connect", () => {
    console.log("Redis Connecting ...");
});
exports.redis.on("ready", () => {
    console.log("Redis connected and ready ...");
});
exports.redis.on('error', err => console.log('Redis Client Error', err));
