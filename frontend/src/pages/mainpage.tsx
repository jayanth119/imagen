import ScatterText from "@/components/splitTextScatterComponent";
import { CustomButton } from "@/components/buttonComponent";
function MainApp() {
  return (
    <>
      <div
        className="hero min-h-screen "
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            {/* <h1 className="mb-5 text-5xl font-bold">Hello there</h1> */}
            <ScatterText />
            <CustomButton />
          </div>
        </div>
      </div>

      <div>
        <div className="m-10 p-10"></div>
      </div>
    </>
  );
}

export default MainApp;
