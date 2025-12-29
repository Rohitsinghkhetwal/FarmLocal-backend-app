import axios from "axios";
import { redis } from "../config/redis";
import { withRedisLock } from "../utils/redislock";

const TOKEN_KEY = "oauth:token";

export async function getAccessToken(): Promise<string> {
  const cached = await redis.get(TOKEN_KEY);
  if (cached) return cached;

  await withRedisLock("oauth:lock", 5, async () => {
    const recheck = await redis.get(TOKEN_KEY);
    if (recheck) return;

    const res = await axios.post(process.env.OAUTH_TOKEN_URL!, {
      grant_type: "client_credentials",
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
    });

    const { access_token, expires_in } = res.data;
    // await redis.set(TOKEN_KEY, access_token, expires_in - 30)
    await redis.set(TOKEN_KEY, access_token, {
      EX: Number(expires_in) - 30,
    });
  });

  return (await redis.get(TOKEN_KEY))!
}
