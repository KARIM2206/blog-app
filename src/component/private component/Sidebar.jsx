import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActiveLink, setIsActiveLink] = useState("/posts");
  const location = useLocation();

  useEffect(() => {
    navigate(`/dashboard${isActiveLink}`)
    // setIsActiveLink()
  }, [])
  const dashboardData = [
    { title: "posts", url: "/posts" },
    { title: "users", url: "/users" },
    { title: "categories", url: "/categories" },
  ];
  const activeClass = (link) => {
    setIsActiveLink(link);
  };

  return (
    <div className=" w-64">
      <div className="bg-gray-800 mt-16 text-white h-auto w-64 py-7 px-2 fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition duration-200 ease-in-out">
        <div className="text-white flex items-center space-x-2 px-4">
          <span className="text-2xl font-extrabold">Logo</span>
        </div>

        <nav>
          {dashboardData.map((e, key) => (
              <Link
                key={key}
                to={`/dashboard${e.url}`}
                onClick={() => activeClass(e.url)}
                className={`
               block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700  ${
                 e.url == isActiveLink ? "bg-blue-500" : ""
               }`}
              >
                {e.title}
              </Link>
            )
          )}
        </nav>
      </div>

     
    </div>
  );
};

export default Sidebar;
