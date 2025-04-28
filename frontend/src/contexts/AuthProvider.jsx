import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toastStyle from "../utils/taost-style";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if token exists on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Optionally, decode the token and set user info here
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
    const from = location.state?.from?.pathname || "/";
    toast.success(
      `Welcome to Tuzy ${userData?.first_name} ${userData?.last_name}`,
      toastStyle
    );
    navigate(from, { replace: true });
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.location.href = "/login";
    // navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
