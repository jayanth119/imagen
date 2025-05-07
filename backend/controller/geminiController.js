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

export default GeminiImageGenerator;
