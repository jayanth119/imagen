import "./App.css";
import LoginPage from "./pages/loginpage";
import RegisterPage from "./pages/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayImagesPage from "./pages/displayImagepage";
import MainApp from "./pages/mainpage";
import WorkingPage from "./pages/workingpage";
// import ToastComponent from './components/toastComponent';
// import PhoneComponent from './components/phoneComponent';
import ProfilePage from "./pages/profilePage";
import { useAuth } from "./context/authcontext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children } : { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/show" element={<DisplayImagesPage />} />
        <Route path="/" element={<MainApp />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <WorkingPage />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/toast" element={<ToastComponent />} />
        <Route path="/phone" element={<PhoneComponent />} /> */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
