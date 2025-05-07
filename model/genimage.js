import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Optional: Only needed if you want to log base64 images as actual previews
// import { createCanvas, loadImage } from "canvas";

class GeminiImageGenerator {
  constructor(apiKey, model = "gemini-2.0-flash-exp-image-generation") {
    this.apiKey = apiKey;
    this.modelName = model;
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generateImage(prompt, savePath = "gemini_image.png") {
    const model = this.client.getGenerativeModel({ model: this.modelName });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        response_mime_type: ["image/png", "text/plain"],
      },
    });

    let imageSaved = false;

    for (const part of result.response.parts) {
      if (part.text) {
        console.log("Text Response:\n", part.text);
      } else if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        fs.writeFileSync(savePath, buffer);
        console.log("Image saved at:", savePath);
        imageSaved = true;
      }
    }

    return imageSaved ? savePath : "No image generated.";
  }
}

// Example usage
const main = async () => {
  const apiKey = ""; // 🔐 Add your Gemini API key here

  const prompt = `
    Create a highly detailed cinematic scene showing Iron Man and Loki teaming up to save the multiverse. 
    Include the multiverse tree, a fierce battle with Kang variants, and Doctor Doom emerging from shadows.
  `;

  const generator = new GeminiImageGenerator(apiKey);
  const imagePath = await generator.generateImage(prompt);
  console.log("Final Image Path:", imagePath);
};

main();
