import React, { createContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../apis/authApis";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInAdmin");
    if (storedUser) setLoggedUser(JSON.parse(storedUser));
  }, []);

  const register = async (name, email, mobileNumber, password) => {
    try {
      const res = await registerUser({ name, email, mobileNumber, password });
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
        // ✅ Store token and user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "loggedInAdmin",
          JSON.stringify({ email, name: res.data.name, user_id: res.data.user_id })
        );

        setLoggedUser({ email, name: res.data.name, user_id: res.data.user_id });

        // ✅ Return full response to handle in Login.jsx
        return { success: true, msg: res.data.msg };;
      }
      //  return { success: false, msg: res.data.msg || "Login failed ❌" };
    } catch (err) {
      console.error(err);
      return { success: false, msg: "Login failed ❌" };
    }
  };

  const logout = () => {
    setLoggedUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInAdmin");
  };

  return (
    <AuthContext.Provider value={{ loggedUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
