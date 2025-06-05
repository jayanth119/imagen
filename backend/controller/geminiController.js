import { GoogleGenAI, Modality } from "@google/genai";
import { uploadImageToCloudinary } from "./upload_img_prompt.js";
import dotenv from "dotenv";
dotenv.config();

class GeminiImageGenerator {
  constructor(apiKey, modelName = "gemini-2.0-flash-exp-image-generation") {
    this.ai = new GoogleGenAI({ apiKey });
    this.modelName = modelName;
  }

  async generateImage(prompt) {
    const response = await this.ai.models.generateContent({
      model: this.modelName,
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    let imageUrl = "";

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        const upload = await uploadImageToCloudinary(buffer, prompt);
        imageUrl = upload.url;
        console.log("Image URL:", imageUrl);
      } else if (part.text) {
        console.log("Text Response:", part.text);
      }
    }

    return {
      imageUrl: imageUrl || null,
      prompt: prompt,
    };
  }
}

const generateImageController =   async (req, res, next) => {
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
}



export default generateImageController;
