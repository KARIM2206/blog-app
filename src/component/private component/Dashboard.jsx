import React, { useEffect,useState } from 'react'
import Sidebar from './Sidebar'
import { getCatogeries, getPosts, getUsers } from '../../../utils/libs'

const Dashboard = () => {
 
  const [users, setusers] = useState([]);
  const [categories, setcategories] = useState([]);

 
  
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCatogeries();
      setcategories(data);
     
    };

    fetchCategories();
  }, []);


  return (
    <div>
     {/* <Sidebar /> */}
    </div>
  )
}

export default Dashboard
