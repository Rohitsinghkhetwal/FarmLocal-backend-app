
import { createClient } from 'redis';
import dotenv from "dotenv"

dotenv.config({
  path: "./.env"
})



export const redis = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as any
    }
});

redis.on("connect", () => {
  console.log("Redis Connecting ...")
})

redis.on("ready", () => {
  console.log("Redis connected and ready ...")
})

redis.on('error', err => console.log('Redis Client Error', err));




