import React, { useContext } from 'react'
import Navbar from './Navbar'
import { AuthContext } from './Context/Provider'
// import Sidebar from './dashboard/Sidebar'

const Home = () => {
  const {postItem}=useContext(AuthContext)
  console.log(postItem);
  const post =[
{    title:"post title",
  content:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facere magni molestias.",
  cover:"/blogger.png",
  category:["vvv","nn"],
  tags:['fkf','hkgogj'],
  author:"karim",
  username:"yousef"

},
{    title:"post title",
  content:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facere magni molestias.",
  cover:"/blogger.png",
  category:["vvv","nn"],
  tags:['fkf','hkgogj'],
  author:"karim",
  username:"yousef"

},
{    title:"post title",
  content:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facere magni molestias.",
  cover:"/blogger.png",
  category:["vvv","nn"],
  tags:['fkf','hkgogj'],
  author:"karim",
  username:"yousef"

},
{    title:"post title",
  content:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facere magni molestias.",
  cover:"/blogger.png",
  category:["vvv","nn"],
  tags:['fkf','hkgogj'],
  author:"karim",
  username:"yousef"

},
{    title:"post title",
  content:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facere magni molestias.",
  cover:"/blogger.png",
  category:["vvv","nn"],
  tags:['fkf','hkgogj'],
  author:"karim",
  username:"yousef"

},
{    title:"post title",
  content:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facere magni molestias.",
  cover:"/blogger.png",
  category:["vvv","nn"],
  tags:['fkf','hkgogj'],
  author:"karim",
  username:"yousef"

},

  ]
  const slice=post.splice(0,1)
  console.log(slice);
  
  return (
    <div className='flex  flex-col'>
      <div className='w-full'>   {
        slice.map((e)=>{
          return(
            
               <div className="">
        <div className='w-[100%]  flex items-center justify-center h-auto bg-gradient-to-t from-gray-300 to-gray-500 '>
          <img src="/blogger.png" alt="vite" className='w-[70%] h-auto ' />
        </div>
        <div className="flex flex-col gap-4  py-2 px-4  bg-gray-500">
<div className='flex w-full justify-between '>
<div className='flex w-fit gap-2 items-center '>
  <p className='text-sky-800'>{e.username}</p>
  <p>{e.author}</p>
</div>
<select name="" id="">
  {e.category.map((c)=>{
    return(
      <option value={`${c}`}>{c}</option>
    )
  })}
</select>
</div>
<div className='text-3xl font-extrabold'>{e.title}</div>
        </div>
      </div>
          )
        })
      }</div>
   
   <div className="w-full bg-sky-600 grid grid-cols-3 gap-4">
     {
    post.map((e,index)=>{
      return(
        <div className="" key={index}>
        <div className='w-[100%] h-auto'>
          <img src="/blogger.png" alt="vite" className='w-full h-auto ' />
        </div>
        <div className="flex flex-col gap-4  py-2 px-4 ">
<div className='flex w-full justify-between '>
<div className='flex w-fit gap-2 items-center '>
  <p className='text-sky-800'>{e.username}</p>
  <p>{e.author}</p>
</div>
<div>createdAt</div>
</div>
<div className='text-3xl font-extrabold'>{e.title}</div>
<div className='text-3xl font-bold text-clip-[100]'>{e.content}</div>
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
