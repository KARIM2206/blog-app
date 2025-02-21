import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCatogeries } from '../../../../utils/libs';
import { AuthContext } from '../../Context/Provider';

const Categories = () => {
  const [category, setcategory] = useState([]);
  const [deleteItem, setdeleteItem] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const [curruntPage,setCurruntPage]=useState(1)
 
 const limit=6
 const totalPage=Math.ceil(category.length / limit)
 const lastIndex=limit * curruntPage
const fisrtIndex=lastIndex - limit
const slice=category.slice(fisrtIndex,lastIndex)

const navigate=useNavigate()
  const {setUpdateCategoriesData,token}=useContext(AuthContext)
  const fetchCategories = async () => {
    try {
      const data = await getCatogeries();
      
      if (data && Array.isArray(data.data)) {
        setcategory(data.data); 
       
    
        
      } 
      else {
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  

   
   
  }, []);


  const handleUpdate = (categoryId) => {
    const singleCategory=category.find(e=>e.id==categoryId)
   
    
    setUpdateCategoriesData(singleCategory)
navigate(`/dashboard/categories/update/${categoryId}`)
  };
const handleDelete=(categoryId)=>{
setdeleteItem(true)
setCategoryId(categoryId)
}
const handleDeleteItem=async()=>{
  try {
    const deleteApi = await fetch(
      `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        // body: JSON.stringify({name,slug}),
      }
    );

  
    console.log("Response Status:", deleteApi.status);

    if (!deleteApi.ok) {
      const errorResponse = await deleteApi.json();
      console.error("API Error Response:", errorResponse);
      alert(`Post creation failed: ${errorResponse.message || "Unknown error"}`);
      return;
    }

    const responsePost = await deleteApi.json();
    console.log("Post Created Successfully:", responsePost);

    alert("category deleted successfully!");
setcategory(c=>c.filter(e=>e.id!=categoryId))
setdeleteItem(false)
  } catch (error) {
    console.error("Error:", error);
    alert(error.message || "Something went wrong");
  }

}

  return (
    <div className='flex flex-col gap-2 ml-3 px-4 relative'>
      <Link to={"/dashboard/categories/create"} className='bg-slate-600 py-2 text-white px-4 rounded-2xl  absolute right-4 top-3'>Add New  Catogery</Link>

      <table className="min-w-full mt-16 bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="text-left bg-gray-200">
            <th className="px-4 py-2 text-sm font-medium text-gray-600">ID</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-600">Category Name</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-600">Category Slug</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-600">Creation Data</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-600 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((e) => {
          return ( <tr key={e.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-700">{e.id}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{e.name}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{e.slug}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{new Date(e.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-sm">
                <button
                  onClick={() => handleUpdate(e.id)}
                  className="px-4 py-2 bg-blue-500 text-center text-white rounded-lg hover:bg-blue-600 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="px-4 py-2 bg-red-500 text-center text-white rounded-lg hover:bg-red-600 mr-2"
                >
                  Delete
                </button>
              </td>
            </tr>)
})}
        </tbody>
      </table>
      {
        deleteItem==true?<div className='flex flex-col px-2 py-1 gap-1.5 z-20 '>
          <h2 className='text-3xl font-bold capitalize '>you want delete this category ?</h2>
          <div className="flex gap-3 items-center ">
            <button  className='px-1 py-0.5 text-black border-none hover:border-2 rounded-2xl border-blue-400'>No</button>
            <button onClick={handleDeleteItem} className='px-5 py-3 text-white border-none rounded-2xl bg-red-400 hover:bg-red-700  '>Yes</button>
          </div>
        </div> : " "
      }
      {
        category.length <limit?
        <div></div> :
<div className="w-full flex items-center justify-evenly mt-2 ">
  <button className={`w-[30%]  bg-red-600 rounded-2xl scale-[1.1] text-2xl ${curruntPage==1?'bg-gray-500':" "} `}disabled={curruntPage==1} onClick={()=>setCurruntPage(c=>c-1)}>-</button>
 
  <p className='text-3xl'>page {curruntPage}</p>
 <button className={`w-[30%]   bg-blue-600 rounded-2xl scale-[1.1] text-2xl ${curruntPage>=totalPage ? 'bg-gray-500' : " " }` }disabled={curruntPage>=totalPage} onClick={()=>setCurruntPage(c=>c+1)}>+</button>
</div>
              }
    </div>
  );
};

export default Categories;

 