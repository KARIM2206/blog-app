import React, { useContext,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Context/Provider";

const Navbar = () => {
  const { user,setUser ,token,setToken} = useContext(AuthContext); 
  
  const {isLogged,setIsLogged}=useContext(AuthContext)
  const [loading, setLoading] = useState(true); 
// const [role,setRole]=useState("")
useEffect(()=> {
  if(isLogged) {
    setLoading(false)
  }
}, [isLogged])

  
const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        // setUser("");
// setRole("")
    };
  return (
    <header className=" w-[100%] ">
      <div className="w-full px-4 items-center">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link to="/" className="w-12 h-auto">
              <img
                src="/blogger.png"
                alt="blog icon"
                className="w-full h-auto object-cover"
              />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {token ? (
                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to={"/login"}
                    className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                  >
                    Login
                  </Link>
                )}

                <div className="hidden sm:flex">
                  {token ? (
                    loading ? (
                      <p>Loading...</p>
                    ) : (
                      <p className="text-black">Hello, {user.username || "Guest"}</p>
                    )
                  ) : (
                    <Link
                      to={"/signup"}
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black"
                    >
                      Sign up
                    </Link>
                  )}
                </div>
              </div>
              <div className="block md:hidden">
                <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
