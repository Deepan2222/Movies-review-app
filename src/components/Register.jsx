import React, { useState } from "react";
import API from "../api/axios"; 
import { useNavigate } from "react-router-dom"; 

export default function Register() {
  
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // default
  });
  
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
      const response = await API.post("/register", formData);
      setMessage(response.data.message || "Registered successfully ✅");
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "user",
      });
      if(setMessage.includes("success")) {
        setTimeout(() => {
          navigate("/login"); // redirect to login after 2 seconds
        }, 5000);

      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
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

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
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

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
