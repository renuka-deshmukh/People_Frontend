import React, { createContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../apis/authApis";
import axiosInstance from "../apis/axiosInstance";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setLoggedUser(JSON.parse(storedUser));

      // ✅ Attach token to axios headers globally
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await registerUser({ name, email, password });
      return res.data.msg;
    } catch (err) {
      console.error(err);
      return err.response?.data?.msg || "Registration failed ❌";
    }
  };

 const login = async (email, password) => {
  try {
    const res = await loginUser({ email, password });

    if (res.data.success) {
      const { user, token } = res.data;

      // 🧠 Store user + token
      localStorage.setItem("token", token);
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      setLoggedUser(user);

      // Add token to all axios requests
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true, msg: res.data.msg };
    }

    return { success: false, msg: res.data.msg || "Login failed ❌" };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, msg: "Login failed ❌" };
  }
};


  const logout = () => {
    setLoggedUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ loggedUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
