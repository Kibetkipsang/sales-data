import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import DashBoardPage from "./pages/DashBoardPage";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
