import { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import "../css/Login.css";
import { baseURL } from "../url";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${baseURL}/login`,
        { email, password },
        { withCredentials: true } // important for cookies
      );
      if (res.status === 200) {
        toast.success("Login successfully !", {
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
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login error:", err.response || err);
      const message = err.response?.data?.message || "Login failed";
       toast.error(message,{
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
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-submit-btn">
          Login
        </button>

        <div className="new-user">
          <p>New user?</p>
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
