import React, { useEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "../src/store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  // Check authentication and manage socket cleanup
  useEffect(() => {
    checkAuth();

    // Cleanup socket when app unmounts
    return () => {
      useAuthStore.getState().disconnectSocket();
    };
  }, []);

  // Automatically connect/disconnect socket when authUser changes
  useEffect(() => {
    const { connectSocket, disconnectSocket } = useAuthStore.getState();
    if (authUser) connectSocket();
    else disconnectSocket();
  }, [authUser]);

  // Sync theme globally to <html>
  useEffect(() => {
    try {
      if (theme) document.documentElement.setAttribute("data-theme", theme);
    } catch (err) {
      // ignore in non-browser environments
    }
  }, [theme]);

  if (import.meta.env.DEV) {
    console.log({ authUser, onlineUsers });
  }

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authUser ? <Settings /> : <Navigate to="/login" />} />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200">
            <div className="text-center space-y-4 animate-fadeIn">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">404</h1>
              <p className="text-xl text-base-content/70">Page Not Found!</p>
              <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
          </div>
        } />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
