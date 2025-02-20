import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Context/Provider';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
//   const { postItem } = useContext(AuthContext);
//   const [categoryName, setCategoryName] = useState('');
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;
  const base_Url = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001";



  useEffect(() => {
    const fetchPosts = async () => {
      try {
   
        const response = await fetch(`http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/posts/${id}`);
     const data=await response.json()
        
      
        if (data.data) {
            const tagsArray = Array.isArray(data.data.tags) ? data.data.tags : JSON.parse(data.data.tags);
           setTags(tagsArray)
          setPosts([data.data]);
          
        
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [id]);


 

  
  const trimContent = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    const trimmed = text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
    return trimmed;
  };

  return (
    <div className='flex flex-col px-[12px]'>
  
    
  <div className="w-full px-6 md:px-12 py-8">
  {posts.map((post) => (
    <div key={post.id} className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
      <img 
        src={`${base_Url}/uploads/posts/${post.cover}`} 
        alt="post cover" 
        className="w-full h-56 object-cover rounded-t-xl"
      />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col gap-2">
            <p className="text-sky-800 font-semibold">{post.author.username}</p>
            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, key) => (
              <div 
                key={key} 
                className="bg-gray-100 text-sm text-gray-700 py-1 px-3 rounded-full border border-gray-300 hover:bg-gray-200"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">{post.title}</h2>
        <p className="text-gray-600 text-base mb-4">{trimContent(post.content, 120)}</p>

      </div>
    </div>
  ))}
</div>


      
    </div>
  );
};

export default PostDetails;
