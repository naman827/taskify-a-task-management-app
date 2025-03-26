import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import BoardPage from "./pages/BoardPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/board/:boardId" element={<BoardPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
