import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Provider";
import { getCatogeries } from '../../../../utils/libs';
const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState("");
const [categoryiesItem,setCategoriesItem]=useState([])
  const { token,setRenderPostPage } = useContext(AuthContext);

  
 const fetchCategories=async()=>{
     
  const categoriesFetch=await getCatogeries()
   
    
 
 setCategoriesItem(categoriesFetch.data||[])
 
  
 }
useEffect(()=>{
  fetchCategories()
},[])
    
    const uploadImg = async () => {
    
      try {
        if (!cover) {
          alert("Please select a cover image");
          return null;
        }
  
        const formData = new FormData();
        formData.append("cover", cover);
  
        const imgApi = await fetch(
          "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/uploads/posts",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
            //  'Content-Type': multipart/form-data
            },
            body: formData,
          }
        );
  
        const imgResponse = await imgApi.json();

  
        if (!imgResponse.data) {
          throw new Error("Image upload failed: No valid data returned");
        }
  
        return imgResponse.data; 
  
      } catch (error) {
        console.error("Image Upload Error:", error);
        return null;
      }
    };
  
 
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      if (!title && !content && categories.length === 0) {
        alert("Title, content, and at least one category are required.");
        return;
      }
    
      try {
        const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);
        if (tagsArray.length === 0) {
          alert("At least one tag is required.");
          return;
        }
    
        const imageUrl = await uploadImg();
        if (!imageUrl) return;
    
        const postData = {
          title,
          content,
          cover: imageUrl, 
          published: true,
          categories:categories.map(Number),
          tags: tagsArray
        };
    
        console.log("Sending Post Data:", categories);
    
        const postApi = await fetch(
          "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
          }
        );
   
        if (!postApi.ok) {
          const errorResponse = await postApi.json();
          throw new Error(`Post creation failed: ${errorResponse.message || "Unknown error"}`);
        }
    
        const responsePost = await postApi.json();
        console.log("Post Created Successfully:", responsePost);
    
        alert("Post created successfully!");
        setRenderPostPage(prev=>prev+1)
    
      } catch (error) {
        console.error("Error:", error);
        alert(error.message || "Something went wrong");
      }
    };
    
    

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 gap-24 items-center pt-10 p-4 w-full   "> 
    <div className="relative flex w-[90%]">     <Link to={"/dashboard/posts"} className="text-black text-4xl px-2 py-4 text-center w-fit bg-sky-700 absolute right-0 top-0 border-none rounded-2xl cursor-pointer ">go to post page</Link >
</div>
      <div className="w-[90%] h-fit bg-white shadow-lg rounded-lg p-6 ">
    
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="title" className="block text-gray-600">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="title"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-gray-600">Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="content"
            ></textarea>
          </div>
          <div>
            <label htmlFor="cover" className="block text-gray-600">Cover Image:</label>
            <input
              type="file"
              onChange={(e) => setCover(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="cover"
            />
          </div>
          <div>
            <label htmlFor="categories" className="block text-gray-600">Categories:</label>
            <select
              multiple 
             
              value={categories}
              onChange={(e) =>
                setCategories([...e?.target?.selectedOptions].map((o) => o?.value))
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="categories"
            >
              {
                categoryiesItem?.map((item)=>{
                return  ( <option value={`${item.id}`} key={item.id}>{item.name}</option>)
                })
              }
             
            </select>
          </div>
          <div>
            <label htmlFor="tags" className="block text-gray-600">Tags:</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags, separated by commas"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="tags"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Publish Post
          </button>
        </form>
        
      </div>
    
    </div>
  );
};

export default Create;
