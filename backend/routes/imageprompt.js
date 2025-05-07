import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.get("/images", async (req, res) => {
  const { limit = 10, next_cursor } = req.query;

  try {
    const search = cloudinary.search
      .expression("folder:gemini-generated")
      .sort_by("created_at", "desc")
      .max_results(Number(limit));

    if (next_cursor) {
      search.next_cursor(next_cursor);
    }

    const result = await search.execute();

    const images = result.resources.map((img) => {
      const publicId = img.public_id; 
      if (!publicId) {
        console.error("Missing public_id in image resource:", img);
        return null;
      }

      const nameParts = publicId.split("/").pop().split("-");
      const promptWords = nameParts.slice(1, -1).join(" ");
      const date = nameParts[nameParts.length - 1];

      return {
        prompt: promptWords,
        date,
        url: img.secure_url,
        public_id: publicId,
        created_at: img.created_at,
      };
    }).filter(Boolean); 

    res.json({
      images,
      next_cursor: result.next_cursor || null,
      total_count: result.total_count || images.length,
    });
  } catch (err) {
    console.error("Error fetching paginated images:", err);
    res.status(500).json({ error: "Could not retrieve images." });
  }
});

export default router;
