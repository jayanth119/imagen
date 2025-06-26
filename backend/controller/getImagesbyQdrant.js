import { Qdrantclient } from '../setup/qdrant.js';
import dotenv from 'dotenv';
dotenv.config();

const fetchAllQdrant = async (req, res) => {
  try {
    const { offset = 0, limit = 20 } = req.query;
    const offsetNum = parseInt(offset, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(offsetNum) || isNaN(limitNum) || offsetNum < 0 || limitNum <= 0) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid offset or limit. Offset must be >= 0 and limit must be > 0' 
      });
    }

    const collectionName = process.env.QDRANT_COLLECTION_NAME || 'default';

    // Method 1: Using scroll with proper pagination
    // For Qdrant, we need to get all points and then paginate manually
    // or use multiple scroll calls to skip to the right offset
    
    let allPoints = [];
    let nextOffset = null;
    let fetchedCount = 0;
    const totalNeeded = offsetNum + limitNum;

    // Keep scrolling until we have enough points to satisfy the offset + limit
    while (fetchedCount < totalNeeded) {
      const scrollParams = {
        limit: Math.min(100, totalNeeded - fetchedCount), // Fetch in batches of 100 or less
        with_payload: true,
        with_vector: false,
      };

      // Add offset for subsequent calls
      if (nextOffset) {
        scrollParams.offset = nextOffset;
      }

      const result = await Qdrantclient.scroll(collectionName, scrollParams);
      
      if (!result.points || result.points.length === 0) {
        break; // No more points to fetch
      }

      allPoints = allPoints.concat(result.points);
      fetchedCount += result.points.length;
      nextOffset = result.next_page_offset;

      // If there's no next page, break
      if (!nextOffset) {
        break;
      }
    }

    // Filter valid points and apply pagination
    const validPoints = allPoints
      .filter(point => point.payload && point.payload.image_url)
      .slice(offsetNum, offsetNum + limitNum);

    const response = validPoints.map(point => ({
      id: point.id,
      file_name: point.payload.file_name || 'Unknown',
      image_url: point.payload.image_url,
      name: point.payload.name || 'Untitled',
      url: point.payload.url || point.payload.image_url,
    }));

    // Get total count for pagination info
    const totalValidPoints = allPoints.filter(point => point.payload && point.payload.image_url).length;

    console.log(`Fetched ${response.length} images (offset: ${offsetNum}, limit: ${limitNum})`);
    
    res.status(200).json({
      success: true,
      data: response,
      pagination: {
        offset: offsetNum,
        limit: limitNum,
        total: totalValidPoints,
        hasMore: (offsetNum + limitNum) < totalValidPoints
      }
    });

  } catch (error) {
    console.error('Error fetching points from Qdrant:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch images from Qdrant',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export default fetchAllQdrant;