// components/ProtectedLayout.js
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const LayoutNavbar = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar with Fixed Height */}
      <header className="h-16 shadow-md  text-white">
        <Navbar />
      </header>

      {/* Main Content that Fills Remaining Space */}
      <main className="flex-1 overflow-auto p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutNavbar;
