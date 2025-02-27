const MarketPlace = require("../models/marketplace.model");

// get all bids
const getAllBids = async (req, res) => {
    const bids = await MarketPlace.find({ type: "bids" });
    res.status(200).json(bids);
};

// create bid
const createBid = async (req, res) => {

    const { type, title, description, category, ownerId, location, amount, deadline } = req.body;

    if (type !== "bids") {
        return res.status(400).json({ error: "Invalid type. Only 'bids' can be created here." });
    }

    if (!ownerId || !title || !description || !category || !location || !deadline || !amount === undefined) {
        return res.status(400).json({ error: "All fields are required for creating bid." });
    }

    const newBid = new MarketPlace({
        type,
        title,
        description,
        category,
        ownerId,
        location,
        amount,
        deadline,
    });

    try {
        await newBid.save();
        res.status(201).json({ message: "Bid created successfully", bid: newBid, });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error while creating bid" });
    }

};

// update bid
const updateBid = async (req, res) => {

    const { bidId } = req.params;
    const { title, description, category, location, amount, deadline, proposals } = req.body;

    // Find and update the bid
    const updatedBid = await MarketPlace.findByIdAndUpdate(
        bidId,
        {
            $set: {
                title,
                description,
                category,
                location,
                amount,
                deadline,
                proposals,
            }
        },
        { new: true }
    );

    if (!updatedBid) {
        return res.status(404).json({ error: "Bid not found" });
    }

    if (updatedBid.type !== "bids") {
        return res.status(400).json({ error: "Invalid update. This entry is not a bid." });
    }

    try {
        res.status(200).json({ message: "Bid updated successfully", bid: updatedBid });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error while updating bid" });
    }
};

// delete bid
const deleteBid = async (req, res) => {

    const { bidId } = req.params;

    const bid = await MarketPlace.findByIdAndDelete(bidId);
    if (!bid) {
        return res.status(404).json({ error: "Bid not found" });
    }

    if (bid.type !== "bids") {
        return res.status(400).json({ error: "Invalid deletion. This entry is not a bid." });
    }

    try {
        res.status(200).json({ message: "Bid deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error while deleting bid" });
    }
};


module.exports = { getAllBids, createBid, updateBid, deleteBid };