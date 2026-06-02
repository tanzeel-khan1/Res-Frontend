// import { createContext, useContext, useState } from "react";
// import API from "../utils/api";
// import React, { createContext, useContext, useState } from "react";
// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);


// export const AuthProvider = ({ children }) => {
//   const getUserFromStorage = () => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       return storedUser ? JSON.parse(storedUser) : null;
//     } catch (err) {
//       console.error("Failed to parse user from localStorage", err);
//       return null;
//     }
//   };

//   const [user, setUser] = useState(getUserFromStorage());

//   const login = async (email, password) => {
//     const { data } = await API.post("/auth/login", { email, password });

//     console.log("Login response:", data);

//     const loggedInUser = data.user || data;
//     localStorage.setItem("token", data.token || "");
//     localStorage.setItem("user", JSON.stringify(loggedInUser));

//     setUser(loggedInUser);

//     return loggedInUser.role;
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useContext, useState } from "react";
import API from "../utils/api";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const getUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      return null;
    }
  };

  const [user, setUser] = useState(getUserFromStorage());

  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });

    const loggedInUser = data.user || data;

    localStorage.setItem("token", data.token || "");
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    setUser(loggedInUser);

    return loggedInUser.role;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};