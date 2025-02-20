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
  const itemsPerPage = 9;
  const base_Url = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001";

  // Fetch posts by category slug
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${base_Url}/api/v1/posts?category=${slug}`);
        if (response.data) {
          setPosts(response.data);
          // Set category name from the first post
          if (response.data.length > 0) {
            setCategoryName(response.data[0].categories[0]?.category.name || '');
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [slug]);

  // Pagination Logic
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(1).slice(indexOfFirstPost, indexOfLastPost);

  // Hero Post
  const heroPost = posts.length > 0 ? posts[0] : null;

  // Function to trim content (without cutting words)
  const trimContent = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    const trimmed = text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
    return trimmed;
  };

  return (
    <div className='flex flex-col px-[12px]'>
      {/* Category Name */}
      {categoryName && (
        <h1 className="text-4xl font-bold text-center my-4">{categoryName}</h1>
      )}

      {/* Hero Section */}
      {heroPost && (
        <div key={heroPost.id} className="mb-6">
          <div className='w-full flex items-center justify-center h-auto bg-gradient-to-t from-gray-300 to-gray-500'>
            <img src={`${base_Url}/uploads/posts/${heroPost.cover}`} alt="hero cover" className='w-[70%] h-auto rounded-lg' />
          </div>
          <div className="flex flex-col gap-4 py-2 px-4 bg-gray-500">
            <div className='flex justify-between'>
              <p className='text-sky-800'>{heroPost.author.username}</p>
              <p>{new Date(heroPost.createdAt).toLocaleDateString()}</p>
            </div>
            <h2 className='text-3xl font-extrabold'>{heroPost.title}</h2>
          </div>
        </div>
      )}

      {/* Posts Grid */}
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

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil((posts.length - 1) / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySlug;
