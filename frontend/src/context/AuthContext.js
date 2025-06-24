import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Auto-fetch user on mount (optional if using session check)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/expenses/protected", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const login = async (username, password) => {
    await axios.post(
      "http://localhost:5000/api/auth/login",
      { username, password },
      { withCredentials: true }
    );
    setUser({ username });
    toast.success("Login successful!");
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    toast("Logged out", { icon: "👋" });
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
