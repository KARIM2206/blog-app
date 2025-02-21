// components/ProtectedLayout.js
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
   
    
  return (
    <div className="flex h-screen mx-0">
     <Sidebar />
      <main className="w-full  "><Outlet/></main>
    </div>
  );
};

export default Layout;