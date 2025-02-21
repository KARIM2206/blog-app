import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/Provider";
import { getCatogeries, getPostById } from '../../../../utils/libs';
const UpdatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
const [categoryiesItem,setCategoriesItem]=useState([])
const [singlePost,setSinglePost]=useState([])
// const[loading,setLoading]=useState(false)
  const { token,setRenderPostPage } = useContext(AuthContext);
 ;
 
  const {id}=useParams()
 const fetchCategories=async()=>{
 
  const categoriesFetch=await getCatogeries()
    
    
 
 setCategoriesItem(categoriesFetch.data)
 
  
 }
 const fetchPostsById=async()=>{
     
  const postFetch=await getPostById(id)
   
    
 
 setSinglePost(postFetch.data||[])
 
  
 }

useEffect(()=>{
  fetchCategories()
  fetchPostsById()
},[])
useEffect(() => {
  if (singlePost && Object.keys(singlePost).length > 0) {
    let tagsText = [];

    try {
      if (singlePost.tags) {
        const parsedTags = typeof singlePost.tags === "string" ? JSON.parse(singlePost.tags) : singlePost.tags;
        const tags = Array.isArray(parsedTags) ? parsedTags : [];
        setTagsArray(tags);
      }
    } catch (error) {
      console.error("Invalid tags format:", error);
     setTagsArray([])
    }

    setTitle(singlePost.title || "");
    setContent(singlePost.content || "");
    // singlePost?.categories?.map((c) =>console.log( c.category.id));
    console.log(typeof singlePost?.categories?.map((c) => c.category.id));
    
    setCategories( singlePost?.categories?.map((c) => c.category.id)||[]);

    setTags(typeof tagsArray=='object'? tagsArray.join(",") : "");
  }
}, [singlePost]);


const uploadImg = async () => {
  try {
    if (!cover) {
      console.warn("No cover image selected.");
      return null;
    }

    const formData = new FormData();
    formData.append("cover", cover);

    const imgApi = await fetch(
      "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/uploads/posts",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    if (!imgApi.ok) {
      throw new Error(`Image upload failed: ${imgApi.statusText}`);
    }

    const imgResponse = await imgApi.json();
    return imgResponse.data || null;
  } catch (error) {
    console.error("Image Upload Error:", error);
    return null;
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!title || !content || categories.length === 0) {
    alert("Title, content, and at least one category are required.");
    return;
  }

  try {
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);
    if (tagsArray.length === 0) {
      alert("At least one tag is required.");
      return;
    }

    const imageUrl = cover ? await uploadImg() : singlePost.cover;
    if (!imageUrl) return;

    const postData = {
      title,
      content,
      cover: imageUrl,
      published: true,
      categories: categories.map(Number),
      tags: tagsArray,
      // id:Number(id)
    };
   
    
    const postApi = await fetch(
      `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/posts/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      }
    );

    if (!postApi.ok) {
      const errorResponse = await postApi.json();
      throw new Error(`Post update failed: ${errorResponse.message || "Unknown error"}`);
    }

    const responsePost = await postApi.json();
    console.log("Post Updated Successfully:", responsePost);

    alert("Post Updated successfully!");
    setRenderPostPage(prev=>prev+1)
navigate("/dashboard/posts")
  } catch (error) {
    console.error("Error:", error);
    alert(error.message || "Something went wrong");
  }
};

    

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pt-10 p-4 w-full ">
      <div className="w-[90%] h-fit bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Update Post
        </h2>
        {
          // loading==true?<div>loading....</div>:
       
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
            <p className="text-gray-300">{singlePost.cover}</p>
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
            Update Post
          </button>
        </form>
         }
      </div>
    <Link to={"/dashboard/posts"} className="text-black text-4xl">go to post page</Link >
    </div>
  );
};

export default UpdatePost;
