import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Provider";

const Posts = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [postId, setPostId] = useState("");
  const {
    setPostItem,
    postItem,
    setCurrentPage,
    currentPage, 
    setUpdatePostData,
    token,
    limit,
    setRenderPostPage
  } = useContext(AuthContext);


  const navigate = useNavigate();
  const totalPage = Math.ceil(postItem.length / limit);

  const handleUpdate = (postId) => {
    navigate(`/dashboard/posts/update/${postId}`);
    const singlePost = postItem.find((post) => post.id === postId);
    setUpdatePostData(singlePost);
  };

  const handleDelete = (postId) => {
    setIsDeleted(true);
    setPostId(postId);
  };

  const handleDeleteItem = async () => {
    try {
      const deleteApi = await fetch(
        `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!deleteApi.ok) {
        const errorResponse = await deleteApi.json();
        console.error("API Error Response:", errorResponse);
        alert(`Post deletion failed: ${errorResponse.message || "Unknown error"}`);
        return;
      }

      alert("Post deleted successfully!");
      setRenderPostPage(c=>c+1)
      setIsDeleted(false);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex  md:w-6xl flex-col gap-0 mx-auto my-8 px-8 relative   min-h-screen">
      
      <Link
        to="/dashboard/posts/create"
        className="bg-slate-600 py-4 text-white px-8 rounded-2xl absolute right-4 top-3 sm:static  sm:self-end"
      >
        Add Post
      </Link>
  
      
      <div className="overflow-x-auto ">
        <table className="mt-16 w-full bg-white border border-gray-300 rounded-lg shadow-md ">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="px-1 py-2 text-sm font-light text-nowrap md:px-8 md:py-4 md:font-extrabold text-gray-600">ID</th>
              <th className="px-1 py-2 text-sm font-light text-nowrap  md:px-8 md:py-4 md:font-extrabold text-gray-600">Post Title</th>
              <th className="px-1 py-2 text-sm font-light text-nowrap md:px-8 md:py-4 md:font-extrabold text-gray-600">Post Author</th>
              <th className="px-1 py-2 text-sm font-light text-nowrap md:px-8 md:py-4 md:font-extrabold text-gray-600">Creation Date</th>
              <th className="px-1 py-2 text-sm font-light text-nowrap md:px-8 md:py-4 md:font-extrabold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {postItem?.length ? (
              postItem.map((post) => (
                <tr key={post.id} className="border-b hover:bg-gray-50">
                  <td className="px-2 py-1 text-sm font-light md:px-8 md:py-4 md:font-bold text-gray-700">{post.id}</td>
                  <td className="px-2 py-1 text-sm font-light md:px-8 md:py-4 md:font-bold text-gray-700">{post.title}</td>
                  <td className="px-2 py-1 text-sm font-light md:px-8 md:py-4 md:font-bold text-gray-700">{post.author.username}</td>
                  <td className="px-2 py-1 text-sm font-light md:px-8 md:py-4 md:font-bold text-gray-700">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-1 text-sm flex flex-col md:px-8 md:py-4 md:font-bold sm:flex-row gap-1">
                    <button
                      onClick={() => handleUpdate(post.id)}
                      className="px-2 py-1 bg-blue-500 text-white md:px-8 md:py-4 md:font-bold rounded-lg hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-2 py-1 bg-red-500 text-white md:px-8 md:py-4 md:font-bold rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-2 py-1 text-center text-sm text-gray-700">
                  No posts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
    
      {isDeleted && (
        <div className="flex flex-col px-4 py-3 gap-2 z-20 bg-white shadow-lg rounded-md p-4">
          <h2 className="text-lg font-bold">Do you want to delete this post?</h2>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setIsDeleted(false)}
              className="px-4 py-2 text-black border border-blue-400 rounded-2xl hover:border-2"
            >
              No
            </button>
            <button
              onClick={handleDeleteItem}
              className="px-5 py-3 text-white bg-red-400 rounded-2xl hover:bg-red-700"
            >
              Yes
            </button>
          </div>
        </div>
      )}
  
      {/* Pagination Controls */}
      <div className="w-full flex items-center justify-between mt-4 px-2 sm:px-0">
        <button
          className={`w-[40%] sm:w-[30%] py-2 text-lg rounded-2xl transition ${
            currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((c) => c - 1)}
        >
          Previous
        </button>
  
        <p className="text-xl sm:text-2xl">Page {currentPage}</p>
  
        <button
          className={`w-[40%] sm:w-[30%] py-2 text-lg rounded-2xl transition ${
            postItem.length < limit ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={postItem.length < limit}
          onClick={() => setCurrentPage((c) => c + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
  
};

export default Posts;
