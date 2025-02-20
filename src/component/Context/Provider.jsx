import React, { createContext, useState, useEffect } from 'react';
import { getPosts } from '../../../utils/libs';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState("");
    const [updateCategoriesData, setUpdateCategoriesData] = useState({});
    const [updatePostData, setUpdatePostData] = useState({});
const [token, setToken] = useState(localStorage.getItem("token"));
 const [isLogged,setIsLogged]=useState(localStorage.getItem("token") ? true : false)
 const[postItem,setPostItem]=useState([])
    // TODO: check if token is in localStorage ---> request to get user info
    // if exist: and get invalid token --> force logout and remove all in localStorage
    // if token is valid---> get user info --> set in localStorage + setUser, setIslogged with true
    // if not exist -> don'r do anything
    useEffect(()=>{
        
if (!token) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setUser(""); 
}else {
    getUserInfo(token)
}

},[])
useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
     
      
      if (data?.data?.posts.length) {
        // setPosts(data.data.posts); 
        setPostItem(data.data.posts); 

      } 
      else {
        console.error("Unexpected API response format:", data);
      }

    
    };

    fetchPosts();
  }, []);  
const getUserInfo = async (token) => {
    try{
    const userInfoResponse = await fetch("http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/users/@me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    let userInfo = await userInfoResponse.json();
    setUser(userInfo.data);
    setIsLogged(true)
}catch (err) {
    console.log(err);
    
}
    
}
    return (
        <AuthContext.Provider value={{ user,setUser,postItem,setPostItem,isLogged,setIsLogged,token,setToken,updateCategoriesData,setUpdateCategoriesData,updatePostData,setUpdatePostData}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
