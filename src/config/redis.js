import { createClient } from "redis";

const client = createClient({
  url: "redis://default:rjFnAboUIitlrlrethk2hesMTCO2xEtp@redis-15568.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com:15568",
});

client.on("error", (err) => {
  console.error(`Error connecting to Redis: ${err}`);
});

client.connect().catch(console.error);

export default client;
