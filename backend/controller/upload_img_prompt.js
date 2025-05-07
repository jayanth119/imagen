import cloudinary from "../config/cloudinary.js";
import slugify from "slugify";

export const uploadImageToCloudinary = async (buffer, prompt) => {
  return new Promise((resolve, reject) => {
    const date = new Date().toISOString().split("T")[0]; // e.g., 2025-05-07
    const safePrompt = slugify(prompt.slice(0, 50), { lower: true, strict: true }); // sanitize filename
    const publicId = `gemini-${safePrompt}-${date}`;

    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "gemini-generated",
        public_id: publicId,
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    ).end(buffer);
  });
};
