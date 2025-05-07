import fs from "fs";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

class PromptChecker {
  constructor(apiKey, modelName = "gemini-2.0-flash-exp-image-generation") {
    // Initialize the GenAI client; no getGenerativeModel() call needed
    this.ai = new GoogleGenAI({ apiKey });
    this.modelName = modelName;
  }

  /** 
   * Checks the prompt for safety. Returns true if safe, false otherwise.
   */
  async checkPrompt(prompt) {
    try {
      const res = await this.ai.models.generateContent({
        model: this.modelName,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: { responseModalities: [Modality.TEXT] },
      });

      // If the prompt was blocked for any reason, promptFeedback.blockReason is set
      if (res.response.promptFeedback?.blockReason) {
        console.warn("Prompt blocked:", res.response.promptFeedback.blockReason);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Safety check failed:", err);
      return false;
    }
  }

}

export default PromptChecker;
