import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/Provider";

const UpdateCategories = () => {
    const {updateCategoriesData,setUpdateCategoriesData}=useContext(AuthContext)
  const navigate = useNavigate();
  const [name, setName] = useState(updateCategoriesData.name);

  const [slug, setSlug] = useState(updateCategoriesData.slug);

  const { token } = useContext(AuthContext);
 const {id}=useParams()

 

 
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Form submitted");
    
    try {
    
      
        
        if (!name || !slug ) {
          alert("Title,slug are required.");
          return;
        }
    
       
    
     
     
      
    
        
        const postApi = await fetch(
          `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/categories/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({name,slug}),
          }
        );
    
      
        console.log("Response Status:", postApi.status);
    
        if (!postApi.ok) {
          const errorResponse = await postApi.json();
          console.error("API Error Response:", errorResponse);
          alert(`Post creation failed: ${errorResponse.message || "Unknown error"}`);
          return;
        }
    
        const responsePost = await postApi.json();
        console.log("Post Created Successfully:", responsePost);
    
        alert("Post created successfully!");
        navigate("/dashboard/categories"); 
    
      } catch (error) {
        console.error("Error:", error);
        alert(error.message || "Something went wrong");
      }

    };
    
    

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 pt-10 p-4 w-full">
      <div className="w-[90%] h-fit bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Create New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="title" className="block text-gray-600">Title:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="title"
            />
          </div>
         
          <div>
            <label htmlFor="tags" className="block text-gray-600">Slug:</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter slug"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="tags"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Publish Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategories;
