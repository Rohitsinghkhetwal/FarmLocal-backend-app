import { redis } from "../config/redis";

export async function getCachedProducts(key:string) {
  const cached = await redis.get(key)
  return cached ? JSON.parse(cached) : null

}

export async function setCachedProducts(key: string, data:any) {
  await redis.set(key,JSON.stringify(data) , {
    EX: 60 // seconds
  })

}