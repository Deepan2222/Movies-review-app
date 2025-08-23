// src/components/Header.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-100 to-indigo-400 shadow-md">
      {/* Left section: Logo + App Name */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
        <h1 className="text-3xl font-extrabold flex">
          <span className="bg-gradient-to-r from-purple-900 to-purple-900 bg-clip-text text-transparent">Mo</span>
          <span className="bg-gradient-to-r from-black to-gray-900 bg-clip-text text-transparent">Vi</span>
          <span className="bg-gradient-to-r from-indigo-900 to-blue-900 bg-clip-text text-transparent">Ra</span>
        </h1>
      </div>

      {/* Right section: Login or User Menu */}
      <nav>
        {!user ? (
          <Link to="/login">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="px-5 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition"
            >
              {`welcome ${user.username}`}
            </button>

            {/* Dropdown menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
