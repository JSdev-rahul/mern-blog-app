const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const Bookmark = require("../models/bookmark");
const Post = require("../models/post");

const postctrl = {
  createNewPostCtrl: async (req, res) => {
    try {
      // Extracting file details
      if (!req.file) {
        return res.status(404).json("file not found");
      }
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = `${path}.${ext}`;

      // Renaming the uploaded file with a new name
      await fs.rename(path, newPath);

      // Verifying the authorization token
      const { authorization } = req.headers;
      const tokenData = jwt.verify(authorization, process.env.JWT_SECRET_KEY);

      // Extracting post details from the request body
      const { title, shortDescription, content, categories } = req.body;
      console.log(title, shortDescription, content, categories);

      // Creating the new post in the database
      const result = await Post.create({
        title,
        categories,
        shortDescription,
        content,
        cover: newPath.replace("uploads/", ""),
        author: tokenData.id,
      });

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  getAllPost: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const totalPostCount = await Post.countDocuments();
      const totalPages = Math.ceil(totalPostCount / limit);

      // const myToken = req.headers.authorization;
      // const userdata = jwt.verify(myToken, process.env.JWT_SECRET_KEY);

      // const userBookmarks = await Bookmark.find({ userId: userdata?.id }).select("postId");
      // const bookmarkedPostIds = new Set(userBookmarks.map((bookmark) => bookmark.postId.toString()));

      const posts = await Post.find({})
        .sort({ createdAt: "descending" })
        .populate("categories", "name")
        .populate("author", "name")
        .select(
          "title content cover shortDescription createdAt author categories"
        )
        .skip(startIndex)
        .limit(limit);

      // const postsWithIsBookmarked = posts.map((post) => ({
      //   ...post.toObject(),
      //   isBookmarked: bookmarkedPostIds.has(post._id.toString()),
      //   bookmarkId: bookmarkedPostIds.has(post._id.toString()) ? userBookmarks.find((bookmark) => bookmark.postId.toString() === post._id.toString())._id : null,
      // }));

      res.status(200).json({ totalPages, posts, totalPostCount });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getPostDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Post.findById(id)
        .populate("author", ["name"])
        .populate("categories", "name");
      if (!result) {
        return res.status(404).json({ error: "Post not found." });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching post details:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },
  getAllMyPost: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const myToken = req.headers.authorization;

      if (!myToken) {
        // If token is not provided
        return res
          .status(401)
          .json({ error: "Authorization token not found." });
      }

      const userdata = jwt.verify(myToken, process.env.JWT_SECRET_KEY);

      const posts = await Post.find({ author: userdata.id })
        .sort({ createdAt: "descending" })
        .populate("categories", "name")
        .populate("author", "name")
        .select(
          "title content cover shortDescription createdAt author categories"
        )
        .skip(startIndex)
        .limit(limit);

      const totalPostCount = await Post.countDocuments({ author: userdata.id });
      const totalPages = Math.ceil(totalPostCount / limit);

      res.status(200).json({ totalPages, posts, totalPostCount });
    } catch (error) {
      // If token is invalid or other error occurred
      res.status(500).json({ error: "Internal server error." });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const originalDoc = await Post.findById(id);

      let newPath = originalDoc.cover;

      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = `${path}.${ext}`;
        await fs.rename(path, newPath);
        newPath = newPath.replace("uploads/", "");
      }

      const { title, shortDescription, content, categories } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          title,
          shortDescription,
          content,
          categories,
          cover: newPath,
        },
        {
          new: true,
        }
      )
        .populate("categories", "name")
        .populate("author", "name");

      if (updatedPost) {
        return res.status(200).json(updatedPost);
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      console.error("Error updating post:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the post" });
    }
  },
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedPost = await Post.findByIdAndDelete(id);

      if (!deletedPost) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.status(200).json({ message: "Deleted successfully", deletedPost });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = postctrl;
