import { axiosInstance_public } from './init'; 


const getAllimages = async (offset : string , limit : string)=>{
    try {
        console.log(1);
        
        const response = await axiosInstance_public.get(`/qdrant/images?offset=${offset}&limit=${limit}`);

        console.log(response.data); 
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
        
    }
}

export { getAllimages }