import { useState, useRef, useEffect } from "react";
import "../css/navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";

const API_URL = baseURL; // LIVE backend URL

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [user, setUser] = useState(null);

  // Detect clicks outside menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}`, { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {},{ withCredentials: true });
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  return (
    <nav className="navbar" ref={menuRef}>
      <div className="navbar-left">
        <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="logo-text">NEED IT</span>
        </Link>
      </div>

      <div className="navbar-right">
        <div className="right-buttons desktop-only">
          <Link to="/contact" className="contact-btn" onClick={handleLinkClick}>
            Contact Me
          </Link>
          {user ? (
            <Link to="/" className="login-btn" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login" className="login-btn" onClick={handleLinkClick}>
              Login
            </Link>
          )}
        </div>

        <div
          className="hamburger mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {menuOpen && (
        <div className="menu-dropdown mobile-only full-width-menu">
          <Link to="/contact" className="contact-btn" onClick={handleLinkClick}>
            Contact Me
          </Link>
          {user ? (
            <Link to="/" className="login-btn" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login" className="login-btn" onClick={handleLinkClick}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
