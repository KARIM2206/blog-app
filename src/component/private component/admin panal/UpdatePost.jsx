import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../Context/Provider";
import { getCatogeries } from "../../../../utils/libs";

const UpdatePost = () => {
  const { updatePostData, setUpdatePostData, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  // Initialize state with default values
  const [title, setTitle] = useState(updatePostData?.title || "");
  const [content, setContent] = useState(updatePostData?.content || "");
  const [cover, setCover] = useState(updatePostData?.cover || null);
  const [categories, setCategories] = useState(updatePostData?.categories || []);
  const [tags, setTags] = useState(updatePostData?.tags || "");
  const [categoryiesItem, setCategoriesItem] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Update form fields when `updatePostData` changes
  useEffect(() => {
    if (updatePostData) {
      setTitle(updatePostData.title || "");
      setContent(updatePostData.content || "");
      setCover(updatePostData.cover || null);
      setCategories(updatePostData.categories || []);
      setTags(updatePostData.tags || "");
    }
  }, [updatePostData]);

  const fetchCategories = async () => {
    const categoriesFetch = await getCatogeries();
    const responseCategories = await categoriesFetch.data;
    setCategoriesItem(responseCategories);
  };

  const uploadImg = async () => {
    try {
      if (!cover) {
        alert("Please select a cover image");
        return null;
      }

      const formData = new FormData();
      formData.append("cover", cover);

      const imgApi = await fetch(
        "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/uploads/posts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const imgResponse = await imgApi.json();
      console.log(imgResponse);

      if (!imgResponse.data) {
        throw new Error("Image upload failed: No valid data returned");
      }

      return imgResponse.data;
    } catch (error) {
      console.error("Image Upload Error:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");

    try {
      if (!title || !content || !categories) {
        alert("Title, content, and categories are required.");
        return;
      }

      const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);
      if (tagsArray.length === 0) {
        alert("At least one tag is required.");
        return;
      }

      const imageUrl = await uploadImg();
      console.log("Uploaded Image URL:", imageUrl);

      if (!imageUrl) {
        alert("Image upload failed. Cannot proceed.");
        return;
      }

      const postData = {
        title,
        content,
        cover: imageUrl,
        published: true,
        categories: Array.isArray(categories) ? categories : categories.split(","),
        tags: tagsArray,
      };

      console.log("Sending Post Data:", postData);

      const postApi = await fetch(
        `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/posts/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
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

      alert("Post updated successfully!");
      navigate("/dashboard/posts");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pt-10 p-4 w-full">
      <div className="w-[90%] h-fit bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Update Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="title" className="block text-gray-600">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="title"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-gray-600">Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="content"
            ></textarea>
          </div>
          <div>
            <label htmlFor="cover" className="block text-gray-600">Cover Image:</label>
            <input
              type="file"
              onChange={(e) => setCover(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="cover"
            />
          </div>
          <div>
            <label htmlFor="categories" className="block text-gray-600">Categories:</label>
            <select
              multiple
              value={categories}
              onChange={(e) =>
                setCategories([...e.target.selectedOptions].map((o) => o.value))
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="categories"
            >
              {categoryiesItem?.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tags" className="block text-gray-600">Tags:</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags, separated by commas"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="tags"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Publish Post
          </button>
        </form>
      </div>
      <Link to={"/dashboard/posts"} className="text-black text-4xl">go to post page</Link>
    </div>
  );
};

export default UpdatePost;