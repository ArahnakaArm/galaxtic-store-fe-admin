import "./App.css";
import Topbar from "./components/main/topbar";
import Sidebar from "./components/main/sidebar";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Category from "./pages/category";

import { ProfileProvider } from "./contexts/ProfileContext";

function App() {
  const [isOpenSideBar, setIsOpenSidebar] = useState(true);
  const [isLoginPage, setIsLoginPage] = useState(false);

  const openSidebar = () => {
    setIsOpenSidebar(!isOpenSideBar);
  };

  useEffect(() => {
    if (window.location.pathname === "/login") setIsLoginPage(true);
    else setIsLoginPage(false);
  }, []);

  const ProtectedRoute = ({ children }) => {
    /*  localStorage.setItem("token", "asdasd"); */
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const ProtectedLoginRoute = ({ children }) => {
    /*  localStorage.setItem("token", "asdasd"); */
    const token = localStorage.getItem("token");
    if (token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <div className="App">
      <ProfileProvider>
        <BrowserRouter>
          <Topbar openSideBar={() => openSidebar()}></Topbar>
          <Sidebar isOpenSide={isOpenSideBar}></Sidebar>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/login"
              element={
                <ProtectedLoginRoute>
                  <Login />
                </ProtectedLoginRoute>
              }
            />
            <Route exact path="profile" element={<Profile />} />
            <Route exact path="category" element={<Category />} />
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </div>
  );
}

export default App;
