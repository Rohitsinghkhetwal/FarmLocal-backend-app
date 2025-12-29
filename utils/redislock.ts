
import { redis } from "../config/redis"


export async function withRedisLock(key: string, ttl: number, fn: () => Promise<any>) {

  const lock = await redis.set(key, "1", {
  NX: true,
  EX: ttl,
});

  if (!lock) return null;
  try {
    return await fn();
  } finally {
    await redis.del(key);
  }

}