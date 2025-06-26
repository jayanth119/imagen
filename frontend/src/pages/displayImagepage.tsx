import type { FC } from "react";
import { useState, useEffect } from "react";
import Card from "@/components/cardComponent";
import PaginationComponent from "@/components/pagenationComponent";
import { NavbarComponent } from "../components/navbarComponent";
import Footer from "@/components/footerComponent";
import { getAllimages } from "../services/Qdrantapi";

interface ImageData {
  id: string;
  file_name: string;
  image_url: string;
  name: string;
  url: string;
}

const DisplayImagesPage: FC = () => {
  const [data, setData] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(12);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getAllimages(
          offset.toString(),
          limit.toString()
        );
        
        console.log("Fetched data:", response);
        
        // Handle the new response structure
        if (response.success && Array.isArray(response.data)) {
          setData(response.data);
        } else if (Array.isArray(response)) {
          // Fallback for old response format
          setData(response);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch images. Please try again.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset, limit]);


  if (loading) {
    return (
      <>
        <NavbarComponent />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-cyan-300 text-xl">Loading images...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavbarComponent />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-400 text-xl text-center">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-white"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavbarComponent />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-300">
            Image Gallery
          </h1>
          

        </div>

        {data.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            No images found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-center mb-8">
              {data.map((item, index) => (
                <Card
                  key={item.id || `image-${index}`}
                  id={item.id}
                  file_name={item.file_name}
                  image_url={item.image_url}
                  name={item.name}
                  url={item.url}
                />
              ))}
            </div>

            <PaginationComponent
              offset={offset}
              limit={limit}
              setOffset={setOffset}
              setLimit={setLimit}
              dataLength={data.length}
            />


          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DisplayImagesPage;