import { createClient } from "redis";
const { createClient } = require("redis");
const GeminiImageGenerator = require("../utils/GeminiImageGenerator");

const redis = createClient();
redis.connect();

const generator = new GeminiImageGenerator(process.env.GEMINI_API_KEY);

const startWorker = async () => {
  while (true) {
    const jobId = await redis.brPop("image_jobs", 0); // waits until a job is available
    const id = jobId.element;
    const job = await redis.hGetAll(`job:${id}`);

    if (job.prompt) {
      try {
        const result = await generator.generateImage(job.prompt);
        await redis.hSet(`job:${id}`, {
          status: "done",
          result: JSON.stringify(result),
        });
      } catch (e) {
        await redis.hSet(`job:${id}`, {
          status: "failed",
          error: e.message,
        });
      }
    }
  }
};

startWorker();
