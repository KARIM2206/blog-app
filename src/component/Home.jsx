import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { AuthContext } from './Context/Provider'
import { getPosts } from '../../utils/libs'
import { fromJSON } from 'postcss'
import { Link } from 'react-router-dom'
// import Sidebar from './dashboard/Sidebar'

const Home = () => {
  const {renderPostPage}=useContext(AuthContext)
 const limit=10
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
const base_Url="http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001"

 
useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts(limit,currentPage);
     
      
      if (data?.data?.posts.length) {
        // setPosts(data.data.posts); 
        setPosts(data.data.posts); 

      } 
      else {
        console.error("Unexpected API response format:", data);
      }

    
    };

    fetchPosts();
  }, [renderPostPage,currentPage]);


  const slice=posts.slice(0,1)
  const postItems=posts.slice(1,posts.length)
  return (
    <div className="flex flex-col px-4">
    
    <div className="w-full">
      {slice.map((e) => (
        <div key={e.id} className="rounded-3xl overflow-hidden shadow-lg bg-white">
        
          <div className="w-full flex items-center justify-center h-auto bg-gradient-to-t from-gray-300 to-gray-500 rounded-3xl">
            <img
              src={`${base_Url}/uploads/posts/${e.cover}`}
              alt="Post Cover"
              className="w-full h-60 object-cover rounded-3xl"
            />
          </div>
  
         
          <div className="flex flex-col gap-4 py-2 px-4 bg-gray-500">
          
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-2 items-center">
                <p className="text-sky-800 font-semibold">{e.author.username}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {e.categories.map((c) => (
                  <p key={c.category.id} className="bg-gray-700 text-white px-2 py-1 text-xs rounded">
                    {c.category.name}
                  </p>
                ))}
              </div>
            </div>
  
           
            <div className="text-2xl font-extrabold break-words whitespace-normal text-white">
              {e.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  
   
    <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {postItems?.map((e) => (
        <div key={e.id} className="rounded-lg overflow-hidden shadow-md bg-white">
        
          <div className="w-full h-auto">
            <img
              src={`${base_Url}/uploads/posts/${e.cover}`}
              alt="Post Cover"
              className="w-full h-48 object-cover"
            />
          </div>
  
          
          <div className="flex flex-col gap-4 py-2 px-4">
           
            <div className="flex justify-between items-center">
              <p className="text-sky-800 font-semibold">{e.author.username}</p>
              <div className='flex flex-col gap-2 items-end '>
              <p className="text-sm text-gray-600 ">{new Date(e.author.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 ">Categories : </p>
 
              <div className="flex flex-wrap gap-2">
                {e.categories.map((c) => (
                  <Link to={`/category/${c.category.slug}`}  key={c.category.id} className="bg-gray-700 text-white px-2 py-1 text-xs rounded">
                    {c.category.name}
                  </Link>
                ))}
              </div>
              </div>
              
            </div>
  
            
            <div className="text-xl font-bold break-words whitespace-normal text-gray-900">
              {e.title}
            </div>
  
            <div className="text-sm text-gray-700 break-words">
              {e.content.length > 100 ? e.content.substring(0, 100) + "..." : e.content}
            </div>
          </div>
        </div>
      ))}
    </div>
    { (
        <div className="w-full flex items-center justify-evenly mt-2">
          <button
          className={`w-[30%] rounded-2xl scale-[1.1] text-2xl ${
            currentPage === 1 ? "!bg-gray-500 !cursor-not-allowed" : "bg-red-600"
          }`}
          
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((c) => c - 1)}
          >
            -
          </button>

          <p className="text-3xl">Page {currentPage}</p>

          <button
            className={`w-[30%] bg-blue-600 rounded-2xl scale-[1.1] text-2xl ${
              posts.length < limit ? "bg-gray-500 cursor-not-allowed" : ""
            }`}
            disabled={posts.length < limit}
            onClick={() => setCurrentPage((c) => c + 1)}
          >
            +
          </button>
        </div>
      )}
  </div>
  
  )
}

export default Home
