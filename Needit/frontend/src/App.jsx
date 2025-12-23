import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";

// Pages
import Home from "./pages/Home";
import Allblogs from "./pages/Allblogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostBlog from "./pages/PostBlog";
import ViewBlog from "./pages/ViewBlog";
import EditBlog from "./pages/EditBlog";

// Fallback Page (for invalid routes)
const NotFound = () => (
  <div    
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",  // full screen height
      backgroundColor: "black", // optional, so white text is visible
    }}
  >
    <h2 style={{ color: "white" }}>404 - Page Not Found</h2>
  </div>
);



function App() {
  return (
    <div className="page-container">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Allblogs />} />
        <Route path="/blogs/post" element={<PostBlog />} />
        <Route path="/blogs/:id" element={<ViewBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={3000}  // disappears after 3 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        style={{
          minWidth: "40vw",      // 50% of screen width
          maxWidth: "80vw",     // limit max widt
        }}
      />

    </div>
  );
}

export default App;
