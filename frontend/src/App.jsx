import React, { useEffect } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import {useThemeStore} from '../src/store/useThemeStore'

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {theme} = useThemeStore()

  useEffect(() => {
    checkAuth();
  }, []);

  // Keep CSS variables available globally by syncing the theme to <html>
  useEffect(() => {
    try {
      if (theme) document.documentElement.setAttribute('data-theme', theme);
    } catch (err) {
      // ignore if running in an environment without document
    }
  }, [theme]);

  console.log({authUser} );

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
        {/* If User not authenticate redirect to Login page */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"}/>}/>
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={"/"}/>} />
        <Route path="/login" element={!authUser ? <Login /> : < Navigate to={"/"} />} />
       <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authUser ? <Settings /> : <Navigate to="/login" />} />
        <Route path="*" element={<div>404 Not Found !</div>} />
        {/* <Route path= "/logout" element={authUser ? <Logout /> : <Navigate to={"/login"}/>}/> */}
      </Routes>

      <Toaster/>
    </div>
  );
}

export default App;
