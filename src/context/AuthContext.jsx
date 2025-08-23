import { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user details
  const [token, setToken] = useState(null); // auth token

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Invalid user data in localStorage:", e);
        localStorage.removeItem("user"); // cleanup bad data
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setToken(userData.token);

    // Store in localStorage for persistence
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
