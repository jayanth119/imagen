from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
import os

class GeminiImageGenerator:
    def __init__(self, api_key: str, model: str = "gemini-2.0-flash-exp-image-generation"):
        self.client = genai.Client(api_key=api_key)
        self.model = model

    def generate_image(self, prompt: str, save_path: str = "gemini_image.png") -> str:
        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
            config=types.GenerateContentConfig(response_modalities=['Text', 'Image'])
        )

        image_saved = False
        for part in response.candidates[0].content.parts:
            if part.text is not None:
                print("Text Response:\n", part.text)
            elif part.inline_data is not None:
                image = Image.open(BytesIO(part.inline_data.data))
                image.save(save_path)
                image.show()
                image_saved = True

        if image_saved:
            return save_path
        return "No image generated."

# Example usage:
if __name__ == "__main__":
    api_key = ""
    prompt = (
        "Create a highly detailed cinematic scene showing Iron Man and Loki teaming up to save the multiverse. "
        "Include the multiverse tree, a fierce battle with Kang variants, and Doctor Doom emerging from shadows."
    )
    generator = GeminiImageGenerator(api_key)
    image_path = generator.generate_image(prompt)
    print("Image saved at:", image_path)
