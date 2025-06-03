// LoginPage.jsx
import { useState, useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // ✅ Import AuthContext

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // ✅ Destructure login from context

  // Handles form submission for user login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/login", { email, password });

      // ✅ Trigger login context to update isAuthenticated globally
      login(response.data.access_token);

      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-green-400 p-8 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Company Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
