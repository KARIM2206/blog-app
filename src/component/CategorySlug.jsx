import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Context/Provider';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategorySlug = () => {
  const { slug } = useParams();
  const { postItem } = useContext(AuthContext);
  const [categoryName, setCategoryName] = useState('');
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;
  const base_Url = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001";


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/posts?limit=${limit}&page=${currentPage}&categorySlug=${slug}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
  
        const data = await response.json(); 
  
        if (data) {
          setPosts(data.data.posts);
          console.log("Fetched Posts:", data); 
  
          if (data.length > 0) {
            setCategoryName(data[0]?.categories[0]?.category?.name || "");
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []); 
  
  console.log(posts); 
  
  
  const indexOfLastPost = currentPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = [];

  
  const slice = posts.slice(0,1);


  const trimContent = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    const trimmed = text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
    return trimmed;
  };

  return (
    <div className='flex flex-col px-[12px]'>
      {categoryName && (
        <h1 className="text-4xl font-bold text-center my-4">{categoryName}</h1>
      )}
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
                {/* {e.categories.map((c) => (
                  <p key={c.category.id} className="bg-gray-700 text-white px-2 py-1 text-xs rounded">
                    {c.category.name}
                  </p>
                ))} */}
                  <p>{new Date(e.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
  
           
            <div className="text-2xl font-extrabold break-words whitespace-normal text-white">
              {e.title}
            </div>
            <div className="text-2xl font-extrabold break-words whitespace-normal text-grey-300">
              {e.content.length>100?e.content.substr(0,100)+"...":e.content}
            </div>
            
          </div>
        </div>
      ))}
    </div>
      

     

   
      <div className="w-full grid grid-cols-3 gap-4">
        {currentPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg p-4">
            <img src={`${base_Url}/uploads/posts/${post.cover}`} alt="post cover" className="w-full h-auto rounded-lg" />
            <div className="mt-2">
              <p className='text-sky-800'>{post.author.username}</p>
              <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600">{trimContent(post.content, 120)}</p>
            </div>
          </div>
        ))}
      </div>

      
      {/* <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil((posts.length - 1) / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default CategorySlug;
