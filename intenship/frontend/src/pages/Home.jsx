import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Home.css";

import { FaRegNewspaper } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { GrResources } from "react-icons/gr";

import { Link } from "react-router-dom";
import { baseURL } from "../url";
import { Loader } from "../components/Loader";

export default function Home() {
  const [user, setUser] = useState(null);  // store logged-in user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(baseURL, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user); // directly access data
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
  return <Loader />; // returns Loader instead of the main UI
}

  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="tagline">From Preparation to Celebration - Start Today</p>
          <h1 className="hero-title">Real Stories. Real Questions. Real Success.</h1>
          <p className="hero-desc">
            From classrooms to coding interviews, we bring you the raw,
            unfiltered experiences of students chasing their tech dreams —
            shared by your very own college peers.
          </p>
        </div>

        <aside className="hero-right">
          <div className="explore-box">
            <h3 className="explore-title">Access Tech Insights</h3>
            <p className="explore-sub">
              Step into the shoes of candidates who’ve been there - their experiences could be the key to your success.
            </p>
            {user ? (
              <Link to="/blogs" className="explore-btn">View</Link>
            ) : (
              <Link to="/signup" className="explore-btn">Sign Up</Link>
            )}
          </div>
        </aside>
      </section>

      {/* FEATURES */}
      <section className="features">
        <Link to={user ? "/blogs" : "/login"} className="contri">
          <div className="feature">
            <div className="feature-icon"><PiStudentBold /></div>
            <div className="feature-body">
              <h4>Students Contributions</h4>
              <p className="muted">Trusted Insights</p>
              <small>Written by Students from Your Own Campus</small>
            </div>
          </div>
        </Link>

        <Link
          to={user
            ? "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
            : "/login"}
          className="contri"
          target={user ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          <div className="feature">
            <div className="feature-icon"><FaRegNewspaper /></div>
            <div className="feature-body">
              <h4>Tech Updates</h4>
              <p className="muted">Stay Connected</p>
              <small>New Opportunities Added Every Day</small>
            </div>
          </div>
        </Link>

        <Link
          to={user ? "https://need-bot.vercel.app/" : "/login"}
          className="contri"
          target={user ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          <div className="feature">
            <div className="feature-icon"><GrResources /></div>
            <div className="feature-body">
              <h4>Talk To NEED-BOT</h4>
              <p className="muted">Built to Power Your Prep with NEED-BOT</p>
              <small>Trusted by Students, Proven to Work</small>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
