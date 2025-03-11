const PostCollection = require("../models/postCollection.model");
const {postValidationSchema, commentValidationSchema} = require("../validators/postCollection.validator");

const createPost = async (req, res) => {
    const { err } = postValidationSchema.validate(req.body);
    if (err) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { userId, caption, image, video, location, tags, visibility } = req.body;

    const newPost = new PostCollection({
        userId,
        caption,
        image,
        video,
        location,
        tags,
        visibility,
    });

    try {
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error while creating post" });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await PostCollection.find().populate("userId", "name email");
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error while getting posts" });
    }
};

const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await PostCollection.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const likeIndex = post.likes.findIndex(like => like.userId.toString() === userId);
        if (likeIndex !== -1) {
            post.likes.splice(likeIndex, 1);
            await post.save();
            return res.status(200).json({ message: "Post unliked", post });
        }

        post.likes.push({ userId });
        await post.save();
        res.status(200).json({ message: "Post liked", post });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error while liking/unliking post" });
    }
};

const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { error } = commentValidationSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const post = await PostCollection.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.comments.push(req.body);
        await post.save();

        res.status(200).json({ message: "Comment added", post });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error while adding comment" });
    }
};

const sharePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await PostCollection.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.shares += 1;
        await post.save();

        res.status(200).json({ message: "Post shared", post });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error while sharing post" });
    }
};

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const deletedPost = await PostCollection.findByIdAndDelete(postId);
        if (!deletedPost) return res.status(404).json({ message: "Post not found" });

        res.status(200).json({ message: "Post deleted", deletedPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error while deleting post" });
    }
};

module.exports = { createPost, getPosts, likePost, addComment, sharePost, deletePost };