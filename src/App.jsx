import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Signup from './component/auth/Signup';
import Login from './component/auth/Login';
import PrivateRoute from './component/PrivateRoute';
import Layout from './component/private component/Layout';
import Dashboard from './component/private component/Dashboard';
import Posts from './component/private component/admin panal/Posts';
import Users from './component/private component/admin panal/Users';
import Categories from './component/private component/admin panal/Categories';
import Create from './component/private component/admin panal/Create';
import CreateCategories from './component/private component/admin panal/CreateCatogeries';
import UpdateCategories from './component/private component/admin panal/updateCategories';
import UpdatePost from './component/private component/admin panal/UpdatePost';
import LayoutNavbar from "./component/LayoutNavbar";
import CategorySlug from "./component/CategorySlug"
import PostDetails from './component/PostDetails';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
       <Route element={<LayoutNavbar/>}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<CategorySlug />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:id" element={<PostDetails />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/posts" element={<Posts />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/categories" element={<Categories />} />
            <Route path="/dashboard/posts/create" element={<Create />} />
            <Route path="/dashboard/categories/create" element={<CreateCategories />} />
            <Route path="/dashboard/categories/update/:id" element={<UpdateCategories />} />
            <Route path="/dashboard/posts/update/:id" element={<UpdatePost />} />
          </Route>
        </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;