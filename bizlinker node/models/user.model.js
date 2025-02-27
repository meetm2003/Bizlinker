const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["business_owner", "user", "admin"],
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    profilePic: {
        type: String,
        default: "default.jpg",
    },
    skills: {
        type: [String],
        default: [],
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String
    },
    businessPortfolio: [{
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        regCertificate: {
            type: String,
        },
        businessLicense: {
            type: String,
        },
        taxCertificate: {
            type: String,
        },
        projects: {
            type: String,
        },
        location: {
            type: String,
        },
        branch: {
            type: String,
        },
    }],
    feedback: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
            },
            review: {
                type: String,
            },
        }
    ],
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("User", userSchema);