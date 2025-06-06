import { useLocation } from "react-router-dom";
export function NavbarComponent() {
    const location = useLocation();
  return (
   <>
   <div className="navbar  bg-base-100 text-white text-2xl  border border-gray-200 shadow-lg">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Imagen </a>
    
  </div>
  <div className="flex gap-2">
     <a
          href={ location.pathname === "/show" ? "/main" : "/show" }
          className={`text-white  mr-10  rounded ${
            location.pathname === "/show"
              ? "bg-blue-600 font-bold shadow"
              : "hover:bg-gray-700"
          }`}
        >
         {location.pathname === "/show" ? "Home" : "Display Images"} 
        </a>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            {/* <span className="badge">New</span> */}
          </a>
        </li>
        <li><a>Photos</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
   </>
  );
}
