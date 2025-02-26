import { createClient } from "redis";
import "dotenv/config";
const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  console.error(`Error connecting to Redis: ${err}`);
});

client.connect().catch(console.error);

export default client;
