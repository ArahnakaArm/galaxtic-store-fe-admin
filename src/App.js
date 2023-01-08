import "./App.css";
import Topbar from "./components/main/topbar";
import Sidebar from "./components/main/sidebar";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";

import { ProfileProvider } from "./contexts/ProfileContext";

function App() {
  const [isOpenSideBar, setIsOpenSidebar] = useState(true);
  const openSidebar = () => {
    setIsOpenSidebar(!isOpenSideBar);
  };
  return (
    <div className="App">
      <ProfileProvider>
        <BrowserRouter>
          <Topbar openSideBar={() => openSidebar()}></Topbar>
          <Sidebar isOpenSide={isOpenSideBar}></Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </div>
  );
}

export default App;
