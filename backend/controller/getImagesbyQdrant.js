import { Qdrantclient } from '../setup/qdrant.js';
import dotenv from 'dotenv';
dotenv.config();




const fetchAllQdrant = async (offset = 0, limit = 20) => {
  try {
    const collectionName = process.env.QDRANT_COLLECTION_NAME || 'default';
    const result = await Qdrantclient.scroll(collectionName, {
      offset,
      limit,
      with_payload: true,
      with_vector: false,
    });

    const response = result.points
      .filter(point => point.payload && point.payload.image_url)
      .map(point => ({
        id: point.id,
        file_name: point.payload.file_name,
        image_url: point.payload.image_url,
        name: point.payload.name,
        url: point.payload.url,
      }));

    // console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching points:', error);
    return [];
  }
};

export default fetchAllQdrant;
