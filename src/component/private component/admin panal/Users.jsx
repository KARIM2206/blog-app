import React, { useState, useEffect, useContext, useId } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../../../utils/libs';
import { AuthContext } from '../../Context/Provider';

const Users = () => {
  const{token}=useContext(AuthContext)
  const [users, setUsers] = useState([]);
const [isUpdated,setIsUpdated]=useState(false)
const [userId,setUserId]=useState("")

  const [curruntPage,setCurruntPage]=useState(1)
const limit=10
 const totalPage=Math.ceil(users.length / limit)
 const lastIndex=limit * curruntPage
const fisrtIndex=lastIndex - limit
const slice=users.slice(fisrtIndex,lastIndex)
const [currentRole,setCurrentRole]=useState("")
const [updateRole,setUpdateRole]=useState("")
 
  
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      console.log(data);
      if (data && Array.isArray(data.data)) {
        setUsers(data.data); 
      } 
      else {
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // console.log(users);
  }, []);



  const handleUpdate = (userId) => {
   setIsUpdated(true)
setUserId(userId)
const userArray = users.find(user => user.id == userId);
if (userArray) {
  setUpdateRole(userArray.role);
} else {
  console.error("User not found!");
}

  };

      console.log(updateRole);
const updateUser=async(event)=>{
  event.preventDefault();
  try{

    const updateData={
      name:updateRole
    }
    const postApi = await fetch(
      `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/users/role/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    console.log("Response Status:", postApi.status);

    if (!postApi.ok) {
      const errorResponse = await postApi.json();
      console.error("API Error Response:", errorResponse);
      alert(`Post update failed: ${errorResponse.message || "Unknown error"}`);
      return;
    }

    const responsePost = await postApi.json();
    console.log("Post Updated Successfully:", responsePost);

    alert("Updated Role User successfully!");
    // navigate("/dashboard/posts");
    setIsUpdated(false)
  } catch (error) {
    console.error("Error:", error);
    alert(error.message || "Something went wrong");

  }
}
  return (
    <div className='flex flex-col gap-2 ml-3 px-4 relative'>
     
      <table className="min-w-full mt-16 bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="text-left bg-gray-200">
            <th className="px-4 py-2 text-sm font-medium text-gray-600">ID</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-600">User Name</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-600">Email</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-600 ">Update</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((user) => {
          return ( <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-700">{user.id}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{user.username}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
              <td className="px-4 py-2 text-sm">
                <button
                  onClick={() => handleUpdate(user.id)}
                  className="px-4 py-2 bg-blue-500 text-center text-white rounded-lg hover:bg-blue-600 mr-2"
                >
                  Update
                </button>
              </td>
            </tr>)
})}
        </tbody>
      </table>
      {
        isUpdated==true&&<div className='w-[50%] absolute left-[30%] top-[40%] bg-gray-100 '>
<button className='flex absolute right-2 top-1 hover:bg-red-500' onClick={()=>setIsUpdated(false)}>X</button>
        <form className='flex flex-col gap-2   w-full py-4 px-8 z-20 '>
          <input type="text" placeholder='enter update data' value={updateRole} onChange={(e)=>setUpdateRole(e.target.value)} className='w-[440px] px-4 py-2 outline-none border-none focus:border-blue-600 border-4' />
          <button 
           className="px-4 py-2 bg-blue-500 text-center text-white rounded-lg hover:bg-blue-600 mr-2"
          onClick={updateUser} >update </button>
        </form>
        </div>
      }
       {
        users.length <limit?
        <div></div> :
<div className="w-full flex items-center justify-evenly mt-2 ">
  <button className={`w-[30%]  hover:bg-red-600 rounded-2xl scale-[1.1] text-2xl ${curruntPage==1?'bg-gray-500':" "} `}disabled={curruntPage==1} onClick={()=>setCurruntPage(c=>c-1)}>-</button>
 
  <p className='text-3xl'>page : {curruntPage}</p>
 <button className={`w-[30%]   hover:bg-blue-600 rounded-2xl scale-[1.1] text-2xl ${curruntPage>=totalPage ? 'bg-gray-500' : " " }` }disabled={curruntPage>=totalPage} onClick={()=>setCurruntPage(c=>c+1)}>+</button>
</div>
              }
    </div>
  );
};

export default Users;
