const express = require("express");
const { createPost, getPosts, likePost, addComment, sharePost, deletePost } = require("../controllers/postCollection.controller");
const routes = express.Router();

routes.post("/post", createPost);
routes.get("/posts", getPosts);
routes.put("/post/:postId/like", likePost);
routes.post("/post/:postId/comment", addComment);
routes.delete("/post/:postId", deletePost);

module.exports = routes;