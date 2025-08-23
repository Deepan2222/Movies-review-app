import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call backend login API
      const response = await API.post("/auth/login", formData);

      // Use the response directly since it contains token + user info
      login(response.data);

      console.log("Login successful:", response.data);
      setMessage("Login successful ✅");
      navigate("/movies"); 
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition">
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline font-medium">Register here</a>
        </p>
      </div>
    </div>
  );
}
