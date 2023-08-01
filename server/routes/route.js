const express = require("express");
const loginController = require("../controller/auth.js");
const userctl = require("../controller/users.js");
const multer = require("multer");
const postctrl = require("../controller/post.js");
const postCategoryctrl = require("../controller/postCategory.js");
const bookmarkCtrl = require("../controller/bookmark.js");
const upload = multer({ dest: "uploads/" });

const route = express.Router();

route.post("/register", userctl.userHandler);
route.post("/login", loginController);
route.post("/post", upload.single("cover"), postctrl.createNewPostCtrl);
route.get("/post", postctrl.getAllPost);
route.get("/post/:id", postctrl.getPostDetails);
route.put("/post/:id", upload.single("cover"), postctrl.updatePost);
route.delete("/post/:id", postctrl.deletePost);
route.get("/my-post", postctrl.getAllMyPost);

// category related routes

route.post("/category", postCategoryctrl.createNewcategory);
route.get("/category", postCategoryctrl.getAllCategory);

// bookmark end point

route.post("/bookmark", bookmarkCtrl.bookmarkPost);
route.get("/bookmark", bookmarkCtrl.getBookmarkPost);
route.delete("/bookmark/:id", bookmarkCtrl.deleteBookmarkPost);
route.get('/bookmark-ids',bookmarkCtrl.getbookmarkIds)

module.exports = route;
