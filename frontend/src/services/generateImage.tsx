import { axiosInstance_public } from './init';

const generateImage = async (prompt: string) => {
  try {
    const response = await axiosInstance_public.post(`/gemini/generate`, { prompt }); 
    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};

export { generateImage };
