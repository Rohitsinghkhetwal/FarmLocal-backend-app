import express from "express";
import dotenv from "dotenv";
import { redis } from "../config/redis"

import { db } from "../config/databaseConnection";
import webhookroute from "../src//routes/webhookroute"
import productsRoute from "../src/routes/productRoute"


dotenv.config({
  path: "./.env",
});

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Hey server is up and running 1");
});

export async function checkDbConnection(): Promise<void> {
  try {
    const connection = await db.getConnection();
    await connection.ping();
    connection.release();
    console.log("✅ MySQL connected successfully");
  } catch (error) {
    console.error("❌ MySQL connection failed:", error);
    process.exit(1);
  }
}



async function startServer() {
  await checkDbConnection();
  await redis.connect();

  app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
  });
}


// using the application routes
app.use("/webhook", webhookroute)
app.use("/products", productsRoute)


startServer()