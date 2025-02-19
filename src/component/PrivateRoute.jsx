import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./Context/Provider";
// import { useAuth } from "./Context/Provider";

const PrivateRoute = () => {
    const { isLogged } = useContext(AuthContext);
const role=localStorage.getItem("role")
    if (!isLogged) {
        console.log("islogged");
        
       
        return <Navigate to="/login" />;
    }
    if (role != "ADMIN") {
        return <Navigate to="/" />; 
    }
  
    return <Outlet/>
   
    
};

export default PrivateRoute;