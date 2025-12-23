import { useState, useEffect } from "react";
import "../css/ViewBlog.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";
import { Loader } from "../components/Loader";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Edit and Delete icons

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseURL}/`, { withCredentials: true });
        setCurrentUser(res.data.user || null);
      } catch (err) {
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/blogs/${id}`, {
          withCredentials: true,
        });
        setBlogData(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        alert("Failed to fetch blog. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${baseURL}/blogs/${id}`, {
          withCredentials: true,
        });
        alert("Blog deleted successfully!");
        navigate("/blogs");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete blog.");
      }
    }
  };

  if (loading) return <Loader />;

  if (!blogData) return <div style={{ color: "#fff", textAlign: "center" }}>Blog not found</div>;

  const isOwner =
    currentUser &&
    blogData.user &&
    (blogData.user._id === currentUser._id ||
      blogData.user === currentUser._id); // for cases when user is just the id

  return (
    <div className="viewblog-container">
      <div className="view-blog-card">
        <div className="view-blog-header">
          <div className="author-left">
            <div className="avatar-placeholder">
              {blogData.user?.fullName
                ? blogData.user.fullName 
                    .split(" ")//split the name into seprate arrays
                    .map((w) => w[0])//get first name and last name first letter eg Adil Ansari = A,A
                    .join("")//join A,A to AA
                    .toUpperCase()
                : "AU"}
            </div>
            <div className="author-info">
              <span className="author-name">
                {blogData.user?.fullName || "Unknown"}
              </span>
              <span className="branch">
                {blogData.user?.branch || "Unknown branch"}
              </span>
            </div>
          </div>
          {isOwner && (
            <div className="desktop-actions">
              <button className="icon-btn edit" onClick={handleEdit}>
                <FiEdit />
              </button>
              <button className="icon-btn delete" onClick={handleDelete}>
                <FiTrash2 />
              </button>
            </div>
          )}
        </div>
        <div className="blog-date">
          {blogData.createdAt
            ? new Date(blogData.createdAt).toLocaleDateString("en-GB", {//create date timestamp string into date object and if formate of day-month-year
                day: "2-digit",
                month: "short",//jab,feb,mar
                year: "numeric",
              })
            : "Unknown date"}
        </div>
        <h1 className="blog-title">{blogData.title}</h1>
        <div className="blog-category">
          {blogData.company} | {blogData.category}
        </div>
        <div className="blog-content">{blogData.content}</div>
      </div>
    </div>
  );
};

export default ViewBlog;
