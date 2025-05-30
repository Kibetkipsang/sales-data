
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; 
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import RegisterPage from "./pages/Register";

function App() {
  return (
    <div className="bg-white  min-h-screen flex flex-col">
    <BrowserRouter>
    <Navbar/>
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </main>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
