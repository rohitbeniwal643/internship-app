const express = require("express");
const {
  getBlogs,
  getBlogById,
  addBlog,
  deleteBlog,
  editBlog,
} = require("../controller/blogs");
const { checkForAuthenticationCookie } = require("../middleware/authenticate");

const router = express.Router();

router.post("/post", checkForAuthenticationCookie("token"), addBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id", checkForAuthenticationCookie("token"), editBlog);
router.delete("/:id", checkForAuthenticationCookie("token"), deleteBlog);

module.exports = router;
