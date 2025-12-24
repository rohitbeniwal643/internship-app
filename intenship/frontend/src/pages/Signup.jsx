import { useState } from "react";
import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password not matched!", {
        style: {
          backgroundColor: "#fdfdfdff", // orange-red
          color: "black",
          padding: "0.4rem 0.8rem",
          borderRadius: "5px",
          textAlign: "center",
          fontSize: "14px",
          minWidth: "160px",
        },
      });

      return;
    }

    try {
      const res = await axios.post(
        `${baseURL}/signup`, // live backend
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true } // send cookies
      );

      if (res.status === 201) {
        toast.success("Account created successfully !", {
        style: {
          backgroundColor: "#fdfdfdff", // orange-red
          color: "black",
          padding: "0.4rem 0.8rem",
          borderRadius: "5px",
          textAlign: "center",
          fontSize: "14px",
          minWidth: "160px",
        },
      });

        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const message = err.response?.data?.message || "Signup failed";
      toast.error(message, {
        style: {
          backgroundColor: "#fdfdfdff", // orange-red
          color: "black",
          padding: "0.4rem 0.8rem",
          borderRadius: "5px",
          textAlign: "center",
          fontSize: "14px",
          minWidth: "160px",
        },
      });

    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Sign Up</h2>

        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signup-submit-btn">
          Sign Up
        </button>

        <div className="already-user">
          <p>Already have an account?</p>
          <Link to="/login" className="login-btn-link">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
