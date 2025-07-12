import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/expenses/protected`,
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      );
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/expenses/protected`,
        { withCredentials: true }
      );
      setUser(res.data.user);
      toast.success("Login successful!");
    } catch (err) {
      toast.error("❌ Login failed. Check credentials.");
      throw err; // let the component handle UI redirect or error
    }
  };

  const logout = async () => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
    toast("Logged out", { icon: "👋" });
  };

  const value = { user, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
