import { createClient } from "redis";
import { v4 as  uuidv4 } from "uuid";


const redis = createClient();
redis.connect();

const publishJob = async (prompt) => {
  const jobId = uuidv4();
  await redis.hSet(`job:${jobId}`, {
    status: "queued",
    prompt: prompt,
  });
  await redis.lPush("image_jobs", jobId);
  return jobId;
};

module.exports = { publishJob };