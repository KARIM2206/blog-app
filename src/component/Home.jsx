import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { AuthContext } from './Context/Provider'
import { getPosts } from '../../utils/libs'
import { fromJSON } from 'postcss'
// import Sidebar from './dashboard/Sidebar'

const Home = () => {
  const {postItem}=useContext(AuthContext)
 
  const [posts, setPosts] = useState([]);
const base_Url="http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001"

  const slice=postItem.splice(0,1)
  // useEffect(()=>{ slice.map(e=>console.log(e.cover))},[slice])

 
  
  return (
    <div className='flex  flex-col px-[12px]'>
      <div className='w-full'>   {
        slice.map((e)=>{
         
         
          return(
            
               <div  key={e.id}>
        <div className='w-[100%]  flex items-center justify-center h-auto bg-gradient-to-t from-gray-300 to-gray-500 '>
          <img src={`${base_Url}/uploads/posts/${e.cover}`} alt="vite" className='w-[70%] h-auto ' />
        </div>
        <div className="flex flex-col gap-4  py-2 px-4  bg-gray-500">
<div className='flex w-full justify-between '>
<div className='flex w-fit gap-2 items-center '>
  <p className='text-sky-800'>{e.author.username}</p>
  
</div>
<div  className='flex w-fit items-center gap-2'>
  {e.categories.map((c)=>{
    return(
      
      <p key={c['category'].id} value={`${c['category'].id}`}>{c['category'].name}</p>
    )
  })}
</div >
</div>
<div className='text-3xl font-extrabold'>{e.title}</div>
        </div>
      </div>
          )
        })
      }</div>
   
   <div className="w-full mt-4  grid grid-cols-3 gap-4">
     {
    postItem?.map((e)=>{
      return(
        <div className="" key={e.id}>
        <div className='w-[100%] h-auto'>
          <img src={`${base_Url}/uploads/posts/${e.cover}`}  alt="vite" className='w-full h-auto ' />
        </div>
        <div className="flex flex-col gap-4  py-2 px-4 ">
<div className='flex w-full justify-between '>
<div className='flex w-fit gap-2 items-center '>
  <p className='text-sky-800'>{e.author.username}</p>

</div>
<div>{new Date(e.author.createdAt).toLocaleDateString() }</div>
</div>
<div className='text-3xl font-extrabold'>{e.title}</div>
<div className='text-3xl  text-clip'>{e.content.length > 100 ? e.content.substring(0, 100) + "..." : e.content}</div>
        </div>
      </div>
      )
    })
     }
    </div>
    </div>
  )
}

export default Home
