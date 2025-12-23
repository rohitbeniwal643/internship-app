import { useState } from "react";
import "../css/PostBlog.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";

export default function PostBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    category: "Tech",
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.category || !formData.content) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${baseURL}/blogs/post`,
        formData,
        { withCredentials: true }
      );
      navigate(`/blogs/${res.data._id}`);
    } catch (err) {
      const message = err.response?.data?.message;
      alert(message || "Failed to post");
    }

    setFormData({
      company: "",
      category: "Tech",
      title: "",
      content: "",
    });
  };

  return (
    <div className="postblog-container">
      <form className="postblog-form" onSubmit={handleSubmit}>
        <h2 className="postblog-title">Interview Experience</h2>
        <label htmlFor="title">Job Title</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        <label htmlFor="company">Company Name</label>
        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required />
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange}>
          <option value="Tech">Tech</option>
          <option value="Non-Tech">Non-Tech</option>
          <option value="Core">Core</option>
          <option value="Others">Others</option>
        </select>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" value={formData.content} onChange={handleChange} required></textarea>
        <button type="submit" className="post-btn">Post</button>
      </form>
    </div>
  );
}
