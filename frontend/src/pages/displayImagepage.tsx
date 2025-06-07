import type { FC } from "react";
import Card from "@/components/cardComponent";
import PaginationComponent from "@/components/pagenationComponent";
import {NavbarComponent} from '../components/navbarComponent'
import Footer from "@/components/footerComponent";
const DisplayImagesPage: FC = () => {
  return (
    <>
      <NavbarComponent />
      <h1 className="text-xl font-bold mb-4 text-cyan-300">
        Image Display Page
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-center">
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662c577775a44fc22d66d4da_Xavier_Dolan_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662b95553c241a20a16f0374_Robert_Crumb_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662b960742230c5ac7341858_Roger_Dean_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662ba3a8afda35f2be8926a0_Ryohei_Hase_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662c4d6d099251917c51163e_Ryoichi_Kurokawa_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662c568614c4341b7d3bf027_Rafael_Lozano-Hemmer_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662c5693f754f84b3d8dfbfb_Paul_Zizka_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662c569af27718cd3fbf2054_Tim_Lahan_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662c56a693bde61f18deb751_Spike_Jonze_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662c5710606b6e5a7b11e333_Pal_Szinyei_Merse_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662c58c49885d2219b49f090_Adolf_Wolfli_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662c56eab97b660943d17dcb_Emilio_Pucci_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662a48add03b62f4dc7b950b_Daniel_Libeskind_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662a3bbdb8843f2246b43ba5_Chris_Van_Allsburg_V6_p.jpeg"} name={""} url={""} />
        <Card id={""} file_name={""} image_url={"https://storage.googleapis.com/demo-midjourney/images/662a3c98e9a86b28ceffde81_Christian_Schloe_V6_p.jpeg"} name={""} url={""} />
      </div>
      <PaginationComponent currentPage={0} totalPages={0} />
      <Footer/>
    </>
  );
};

export default DisplayImagesPage;
