import Footer from "@/components/footerComponent"
import { NavbarComponent } from "@/components/navbarComponent"
function ProfilePage() {
  return (
    <>
     <NavbarComponent />

    
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold text-amber-300">Box Office News!</h1>
          <p className="py-6 text-amber-300">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Photos </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default ProfilePage