const jwt = require("jsonwebtoken");
const Bookmark = require("../models/bookmark");

const bookmarkCtrl = {
  bookmarkPost: async (req, res) => {
    try {
      const myToken = req.headers.authorization;
      const { postId } = req.body;
      const tokenData = jwt.verify(myToken, process.env.JWT_SECRET_KEY);
      const existingBookmark = await Bookmark.findOne({
        userId: tokenData?.id,
        postId,
      });

      if (existingBookmark) {
        // Bookmark already exists, you can update the existing bookmark here if needed
        return res.status(400).json({ error: "Bookmark already exists" });
      }

      const bookmark = await Bookmark.create({
        postId,
        userId: tokenData?.id,
      });

      return res.status(201).json(bookmark);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getBookmarkPost: async (req, res) => {
    try {
      const page = req.query?.page;
      const limit = req.query?.limit;
      startIndex = (page - 1) * limit;

      const myToken = req.headers.authorization;
      const tokenData = jwt.verify(myToken, process.env.JWT_SECRET_KEY);

      const bookmarks = await Bookmark.find({ userId: tokenData?.id })
        .populate({
          path: "postId",
          populate: {
            path: "author",
            model: "User", // Use the User model
            select: "-password",
          },
        })
        .populate({
          path: "postId",
          populate: {
            path: "categories",
            model: "postCategory",
          },
        })
        .skip(startIndex)
        .limit(limit);

      const totalBookmarkCount = await Bookmark.countDocuments({
        userId: tokenData?.id,
      });
      const totalPages = Math.ceil(totalBookmarkCount / limit);

      res.status(200).json({ totalPages, bookmarks, totalBookmarkCount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  deleteBookmarkPost: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Bookmark.findByIdAndDelete(id);
      console.log("res");
      res.status(200).json(result);
    } catch (error) {}
  },

  getbookmarkIds: async (req, res) => {
    try {
      const myToken = req.headers.authorization;
      const tokenData = jwt.verify(myToken, process.env.JWT_SECRET_KEY);

      const bookmarksIds = await Bookmark.find({ userId: tokenData?.id });
      res.status(200).json(bookmarksIds);
    } catch (error) {}
  },
};

module.exports = bookmarkCtrl;
