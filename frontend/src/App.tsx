
import './App.css'
import LoginPage from './pages/loginpage'
import RegisterPage from './pages/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DisplayImagesPage from './pages/displayImagepage';
import MainApp from './pages/mainpage';
import WorkingPage from './pages/workingpage';
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/show" element={<DisplayImagesPage />} />
        <Route path="/" element={<MainApp />} />
        <Route path="/main" element={<WorkingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
