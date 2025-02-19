import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Provider";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setIsLogged,setUser,setToken, token } = useContext(AuthContext);

    useEffect(()=>{
        if (token) {
            navigate("/")
        }
    },[])

    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            
            const response = await fetch(
                "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/auth/signing",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            let token = data.data;
            // todo: fetch user info to get user role
            const userInfoResponse = await fetch("http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/users/@me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            let userInfo = await userInfoResponse.json();
            localStorage.setItem("token",token)
            setIsLogged(true);

            const usernameAuth=userInfo.data.username
            setUser(usernameAuth)
            setToken(token)
            // TODO: here you should save role, token, userName
            // call setUser, setIsoLggedIn + set into localStorage
            let userRole = userInfo.data.role;

            localStorage.setItem('role', userRole);
            if (userRole == "ADMIN") {
                navigate("/dashboard"); 
               
                
            } else {
                navigate("/"); 
            }

            
        } catch (error) {
            console.error("Error:", error);
            setError(error.message || "An error occurred during login.");
        }
        
    
        console.log();
    };

    return (
        <div className="w-full h-[100vh] flex items-center flex-col mt-[10%] gap-8">
            <h2 className="text-6xl capitalize font-extrabold">Login Page</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form
                className="flex flex-col w-[500px] bg-white px-2.5 rounded-b-md gap-4"
                onSubmit={handleSubmit}
            >
                <div className="flex gap-2 flex-col">
                    <label className="text-2xl capitalize font-bold" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-1.5 border-2 py-1 focus:border-black focus:border-4 rounded-b-md"
                        required
                    />
                </div>
                <div className="flex gap-2 flex-col">
                    <label className="text-2xl capitalize font-bold" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="px-1.5 py-1 border-2 focus:border-black focus:border-4 rounded-b-md"
                        required
                    />
                </div>
                <button type="submit" className="bg-black text-white capitalize w-full py-2">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;