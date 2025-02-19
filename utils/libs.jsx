const token=localStorage.getItem("token")
export const getPosts=async()=>{
    
    const response=await fetch("http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/posts")
    const data=await response.json()
    return data
}
export const getCatogeries=async()=>{
    
    const response=await fetch("http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/categories")
    const data=await response.json()
    return data
}

export const getUsers=async()=>{
  if (token) {
    try {
       const response=await fetch("http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/users",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
        }
       }) 
       if (!response.ok) {
        if (response.status === 401) {
            // Token is invalid or expired
            localStorage.removeItem("token"); // Clear the token
            throw new Error("Session expired. Please log in again.");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
} catch (error) {
    console.error("Error fetching users:", error);
    throw error;
}
} else {
throw new Error("No token found. Please log in.");
}
  
    
  }
   

