import React, { useContext, useEffect, useState } from 'react'
import { getComment } from '../../utils/libs'
import { AuthContext } from './Context/Provider'

const Comments = ({postId,refreshTrigger,setRefreshTrigger}) => {
    const[comment,setComment]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[deleteComment,setDeleteComment]=useState(false)
    const[deleteAllComment,setDeleteAllComment]=useState(false)
    const{user,token}=useContext(AuthContext)
   
    
    const limit=10
    const onCommentDeleteed=()=>{
setRefreshTrigger(prev=>prev-1)
    }
    const fetchComment=async()=>{
        const responseComment=await getComment(currentPage,limit,postId)
        setComment(responseComment.data)
    }
   
    
    useEffect(()=>{
        fetchComment()
    },[postId,refreshTrigger,currentPage])
  
    console.log(comment);
    useEffect(()=>{
      if(user.role=='ADMIN'){
        setDeleteAllComment(true)
      }
     
     
    },[user])

    const handleDelete = async (id) => {
       
 
  
      try {
     
  
        const postApi = await fetch(
          `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/comments/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
        
          }
        );
  
        if (!postApi.ok) {
          const errorResponse = await postApi.json();
          throw new Error(`Comment Deleted failed: ${errorResponse.message || "Unknown error"}`);
        }
  
        const responsePost = await postApi.json();
        console.log("Comment Deleted Successfully:", responsePost);
  
        alert("Comment Deleted successfully!");
        // setComment(c=>c.filter(e=>e.id!=id)); 
        onCommentDeleteed()
        
      } catch (error) {
        console.error("Error:", error);
        alert(error.message || "Something went wrong");
      }
    };
  
  return (
    <div>
    <div className='flex flex-col gap-2 overflow-auto '>
   
      {
        comment.map((singleComment)=>{
          
          
            return(
             <div className='bg-gray-300 px-4 mx-4 py-2 border-none  rounded-2xl flex items-center justify-between '> 
                <div key={singleComment.id}  >
                    {singleComment.text}
                </div>
                <div>    
                    {deleteAllComment==true?
                    <button onClick={(e)=>handleDelete(singleComment.id)}>X</button>:user.username==singleComment.author.username?
                    <button onClick={(e)=>handleDelete(singleComment.id)}>X</button>:""}
                </div>
       
            </div> 
            )
        }
       
        )
      }
    
    </div>
    {limit>comment.length?""
    :
    <div className='flex w-full gap-4 items-center text-2xl justify-center mt-6 '>
               <button disabled={currentPage==1} onClick={()=>setCurrentPage(c=>c-1)} 
                className={`w-9 h-9 rounded-[50%] flex items-center justify-center bg-blue-600 border-none ${currentPage==1 ? 'bg-gray-500':''}`}>
                &lt;
               </button>
               <button onClick={()=>setCurrentPage(c=>c+1)} disabled={comment.length < limit}
                className={`w-9 h-9 rounded-[50%] flex items-center justify-center bg-blue-600 border-none ${comment.length < limit ? 'bg-gray-500':''}`}>
                &gt;
               </button>
                </div>
}
    </div>
  )
}

export default Comments
