import React, { useState ,useEffect, useContext} from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../Context/Provider';
import { getPosts } from '../../../../utils/libs';

const Posts = () => {
   const [posts, setPosts] = useState([]);
   const [isDeleted,setIsDeleted]=useState(false)
   const[postId,setPostId]=useState("")
   const{setPostItem}=useContext(AuthContext)
   const navigate=useNavigate()
   const {setUpdatePostData,token}=useContext(AuthContext)
    useEffect(() => {
        const fetchPosts = async () => {
          const data = await getPosts();
          console.log(data?.data?.posts?.length);
          
          if (data?.data?.posts) {
            setPosts(data.data.posts); 
            setPostItem(data.data.posts); 
          } 
          else {
            console.error("Unexpected API response format:", data);
          }
 
       
        };
    
        fetchPosts();
      }, []);  
   console.log(posts);
const handleUpdate=(postId)=>{
  navigate(`/dashboard/posts/update/${postId}`)
  const singlePost=posts.find(post=>post.id==postId)
  setUpdatePostData(singlePost)
}   
 const handleDelete=(postId)=>{
setIsDeleted(true)
setPostId(postId)
 } 
 const handleDeleteItem=async()=>{
  try {
    const deleteApi = await fetch(
      `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        // body: JSON.stringify({name,slug}),
      }
    );

  
    console.log("Response Status:", deleteApi.status);

    if (!deleteApi.ok) {
      const errorResponse = await deleteApi.json();
      console.error("API Error Response:", errorResponse);
      alert(`Post creation failed: ${errorResponse.message || "Unknown error"}`);
      return;
    }

    const responsePost = await deleteApi.json();
    console.log("Post Created Successfully:", responsePost);

    alert("category deleted successfully!");
setPosts(c=>c.filter(e=>e.id!=postId))
setIsDeleted(false)
  } catch (error) {
    console.error("Error:", error);
    alert(error.message || "Something went wrong");
  }

}
    
  return (
    <div className='flex flex-col gap-2 px-4 relative'>
      <Link to={"/dashboard/posts/create"} className='bg-slate-600 py-2 text-white px-4 rounded-2xl  absolute right-4 top-3'>
      add post</Link>

      <table className="min-w-full mt-16 bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="text-left bg-gray-200">
            <th className="px-4 py-2 text-sm font-medium text-gray-600">ID</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-600">Post Title</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-600">Post Author</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-600">Creation Date</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts?.length ? posts?.map((post) => (
            <tr key={post.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-700">{post.id}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{post.title}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{post.author.username}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{new Date(post.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-sm">
                <button
                  onClick={() => handleUpdate(post.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : <strong>No posts available</strong>}
        
        </tbody>
      </table>
      {
      isDeleted==true?<div className='flex flex-col px-2 py-1 gap-1.5 z-20 '>
          <h2 className='text-3xl font-bold capitalize '>you want delete this category ?</h2>
          <div className="flex gap-3 items-center ">
            <button  className='px-1 py-0.5 text-black border-none hover:border-2 rounded-2xl border-blue-400'>No</button>
            <button onClick={handleDeleteItem} className='px-5 py-3 text-white border-none rounded-2xl bg-red-400 hover:bg-red-700  '>Yes</button>
          </div>
        </div> : " "
      }
    </div>
  )
}

export default Posts
