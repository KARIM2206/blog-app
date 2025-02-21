import React, { useContext, useState } from 'react';
import { AuthContext } from './Context/Provider';

const CreateComment = ({ postId,onCommentAdd }) => {
  const [comment, setComment] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!comment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    try {
      

      const commentData = {
        text: comment.trim(),
        postId: Number(postId),
      };

      const postApi = await fetch(
        "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!postApi.ok) {
        const errorResponse = await postApi.json();
        throw new Error(`Post creation failed: ${errorResponse.message || "Unknown error"}`);
      }

      const responsePost = await postApi.json();
      console.log("Comment Created Successfully:", responsePost);

      alert("Comment created successfully!");
      setComment(""); 
      onCommentAdd()
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      {token ? (
        <div className='flex flex-col gap-6 px-4 py-2 rounded-2xl'>
          <form className='flex flex-col w-full rounded-2xl' onSubmit={handleSubmit}>
            <textarea
              value={comment}
              className='rounded-2xl w-full px-2 py-2 focus:border-blue-500'
              onChange={(e) => setComment(e.target.value)}
              placeholder='Add a comment'
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
              Add Comment
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default CreateComment;
