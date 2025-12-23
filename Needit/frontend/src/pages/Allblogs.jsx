import { useState, useEffect } from "react";
import "../css/Allblogs.css";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";
import { Loader } from "../components/Loader";

const categories = ["All", "Tech", "Non-Tech", "Core"];

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${baseURL}/blogs`, {
          withCredentials: true,
        });
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        alert("Failed to fetch blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
  return <Loader/>; // returns Loader instead of the main UI
}

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="blog-container">
      <div className="blog-header-with-btn">
        <div className="blog-header">
          <span className="blog-tag">All You Need to Know</span>
          <h1>NEED IT Presents the Ultimate Interview Blog Collection</h1>
        </div>
      </div>

      <div className="categories">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
        <Link to="/blogs/post" className="create-btn">
          Create+
        </Link>
      </div>

      <div className="blog-list">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p>No blogs found for {selectedCategory}.</p>
        )}
      </div>
    </div>
  );
}
