const mongoose = require("mongoose");

const PostCollection = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    caption: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    location: {
        type: String,
    },
    tags: {
        type: [String],
        default: [],
    },
    visibility: {
        type: String,
        enum: ["public", "private", "friends"],
        default: "public",
    },
    likes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            text: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    views: {
        type: Number,
        default: 0,
    },
    shares: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("PostCollection", PostCollection);