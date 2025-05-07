import express from "express";
const router = express.Router();
import GeminiImageGenerator from "../controller/geminiController.js";
router.post("/generate", async (req, res, next) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' in request body." });
  }
  const apiKey = process.env.GEMINI_API_KEY;
  // promptcheck = new PromptChecker( apiKey); 
  // if(promptcheck.checkPrompt(prompt) == false){
  //   return res.status(400).json({ error: "Prompt is unsafe." });
  // }
 
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY not set in environment." });
  }

  const generator = new GeminiImageGenerator(apiKey);
  try {
    const response = await generator.generateImage(prompt);
    // if (!savedPath) {
    //   return res.status(500).json({ error: "No image generated." });
    // }
    
    // const fileName = savedPath.split("/").pop();
    // return res.json({ imageUrl: `/images/${fileName}` });
    console.log(response);
    
    return res.json(response);
  } catch (err) {
    next(err);
  }
});

export default router;
