import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("smartChefUser");
      return saved ? JSON.parse(saved) : null;
    } catch {
      localStorage.removeItem("smartChefUser");
      localStorage.removeItem("smartChefToken");
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem("smartChefUser", JSON.stringify(user));
    else localStorage.removeItem("smartChefUser");
  }, [user]);

  async function login(email, password) {
    setLoading(true);
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem("smartChefToken", data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  }

  async function signup(name, email, password) {
    setLoading(true);
    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
      });
      localStorage.setItem("smartChefToken", data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  }

  async function googleSignin(credential) {
    const data = await api("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential })
    });
    localStorage.setItem("smartChefToken", data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem("smartChefToken");
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, login, signup, googleSignin, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
