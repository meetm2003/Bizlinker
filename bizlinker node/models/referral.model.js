const mongoose = require("mongoose");

const ReferralProgram = new mongoose.Schema({
    requesterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    companyName:{
        type: String,
        required: true,
    },
    purpose:{
        type: String,
        required: true,
    },
    referrers: [
        {
            referrerId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            status:{
                type: String,
                enum: ["Pending", "Accepted", "Declined"],
                default: "Pending",
            },
            message:{
                type: String,
            },
        }
    ],
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed", "Rejected"],
        default: "Pending",
    },
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ReferralProgram", ReferralProgram);