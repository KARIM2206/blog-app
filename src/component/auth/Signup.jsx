import React, { useContext, useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Provider';

function Signup() {
    const [username,setUsername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const{setToken}=useContext(AuthContext)
    const navigate=useNavigate()
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password,email:email }),
          });
      
          const data = await response.json(); 
    
      
          if (!response.ok) {
            throw new Error(data.message ); 
          }
          let token = data.data;
          console.log("Signup successful:", JSON.stringify(data));
          localStorage.setItem("token",token)
          setToken(data.data)
         
          
          setUsername("")
          setpassword("")
          setemail("")
          navigate("/")
        } catch (error) {
          console.error("Error:", error);
        }
      };
      

        
  return (
    <div className="w-full h-[100vh] flex items-center  flex-col mt-[10%] gap-8 ">
        <h2 className='text-6xl capitalize font-extrabold'>sign up page</h2>
         <form className='flex flex-col w-[500px] bg-white px-2.5 rounded-b-md  gap-4' onSubmit={handleSubmit}>
    <div className='flex gap-2 flex-col '>
        <label className=' text-2xl capitalize font-bold' htmlFor="username">username</label>
        <input type="text" id='username' placeholder='enter user name' value={username} onChange={(e)=>setUsername(e.target.value)} className='px-1.5 border-2 py-1 focus:border-black focus:border-4 rounded-b-md' required/>
    </div>
    <div className='flex gap-2 flex-col '>
        <label className=' text-2xl capitalize font-bold' htmlFor="email">email</label>
        <input type="email" id='email' placeholder='enter email' value={email} onChange={(e)=>setemail(e.target.value)} className='px-1.5 border-2 py-1 focus:border-black focus:border-4 rounded-b-md' required/>
    </div>
    <div className='flex gap-2 flex-col '>
        <label className=' text-2xl capitalize font-bold' htmlFor="password">password</label>
        <input type="password" id='password'
        value={password} onChange={(e)=>setpassword(e.target.value)}
         placeholder='enter password'
         className='px-1.5 py-1 border-2 focus:border-black focus:border-4  rounded-b-md' required/>
    </div>
    <button type='submit' className='bg-black text-white capitalize w-full py-2'>sign up</button>
   </form></div>
  
  )
}

export default Signup
