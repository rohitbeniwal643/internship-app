import { useState, useEffect } from "react";
import "../css/PostBlog.css"; // reuse styling
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";

export default function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    company: "",
    category: "Tech",
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch blog to pre-fill form
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${baseURL}/blogs/${id}`, {
          withCredentials: true,
        });
        setFormData({
          company: res.data.company,
          category: res.data.category,
          title: res.data.title,
          content: res.data.content,
        });
      } catch (err) {
        alert("Failed to load blog for editing");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/blogs/${id}`, formData, {
        withCredentials: true,
      });
      navigate(`/blogs/${id}`); // redirect back
    } catch (err) {
      const message = err.response?.data?.message;
      alert(message || "Failed to update blog");
    }
  };

  const handleCancel = () => {
    navigate(`/blogs/${id}`);
  };

  if (loading) return <p>Loading blog...</p>;

  return (
    <div className="postblog-container">
      <form className="postblog-form" onSubmit={handleUpdate}>
        <h2 className="postblog-title">Edit Blog</h2>

        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="company">Company Name</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Tech">Tech</option>
          <option value="Non Tech">Non Tech</option>
          <option value="Core">Core</option>
          <option value="Others">Others</option>
        </select>

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>

        {/* Button Group */}
        <div className="btn-group">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="update-btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
