const mongoose = require("mongoose");

const MarketPlaceSchema = new mongoose.Schema({
    type:{
        type: String,
        enum: ["bids", "collabs"],
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    amount: {
        type: Number, // for bids
    },
    deadline: {
        type: Date,
        required: true,
    },
    proposals: [
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            amount:{
                type: Number, // for bids
            },
            message:{
                type: String,
                required: true,
            },
            status:{
                type: String,
                enum: ["Pending", "Accepted", "Rejected"],
                default: "Pending",
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const MarketPlace = mongoose.model("MarketPlace", MarketPlaceSchema);

module.exports = MarketPlace;