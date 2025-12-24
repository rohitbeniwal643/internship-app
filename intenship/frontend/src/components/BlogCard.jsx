import React from "react";
import "../css/BlogCard.css";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const diffMs = now - new Date(createdAt);
    const diffSeconds = Math.floor(diffMs / 1000);
    if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffdays = Math.floor(diffHours / 24);
    if (diffdays < 30) return `${diffdays} days ago`;
    const diffmonths = Math.floor(diffdays / 30);
    return `${diffmonths} months ago`;
  };

  return (
    <div className="blog-card">
      <div className="blog-left">
        <div className="avatar-placeholder">
          {blog.user?.fullName?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="author-info">
          <p className="author">{blog.user?.fullName || "Unknown"}</p>
          <p className="branch">{blog.user?.branch || "Unknown branch"}</p>
        </div>
      </div>

      <div className="blog-middle">
        <p className="date">{getTimeAgo(blog.createdAt)}</p>
        <h2 className="title">{blog.title}</h2>
        <p className="type">
          <span className="company-name">{blog.company}</span> | {blog.category}
        </p>
        <p className="desc">{blog.content.split(" ").slice(0, 20).join(" ")}...</p>
      </div>

      <div className="blog-right">
        <Link to={`/blogs/${blog._id}`} className="view-btn">
          View
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
