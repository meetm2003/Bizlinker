const MarketPlace = require("../models/marketplace.model");

// create proposal for bid and collab
const createProposal = async (req, res) => {
    const { marketplaceId } = req.params;
    const { userId, amount, message } = req.body;

    const marketplace = await MarketPlace.findById(marketplaceId);
    if (!marketplace) {
        return res.status(404).json({ error: "Marketplace entry not found" });
    }

    if (!userId || !message) {
        return res.status(400).json({ error: "User ID and Message are required" });
    }

    if (marketplace.type === "bids" && amount === undefined) {
        return res.status(400).json({ error: "Amount is required for bid" });
    }

    const newProposal = {
        userId,
        amount,
        message,
        status: "Pending",
    };

    try {
        marketplace.proposals.push(newProposal);
        await marketplace.save();

        res.status(201).json({ message: "Proposal added successfully", proposals: newProposal });
    } catch (err) {
        console.log("Error creating Proposal: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateProposalStatus = async (req, res) => {
    const { marketplaceId, proposalId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedBid = await MarketPlace.findOneAndUpdate(
        { _id: marketplaceId, "proposals._id": proposalId }, // Match bid & proposal inside it
        { $set: { "proposals.$.status": status } }, // Update proposal status
        { new: true }
    );

    if (!updatedBid) {
        return res.status(404).json({ error: "Bid or proposal not found" });
    }

    try {
        res.status(200).json({ message: "Proposal status updated successfully", bid: updatedBid });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while updating proposal status" });
    }
};

const deleteProposal = async (req, res) => {
    try {
        const { marketplaceId, proposalId } = req.params;

        const deleteBidProposal = await MarketPlace.findByIdAndUpdate(
            marketplaceId,
            { $pull: { proposals: { _id: proposalId } } }, // Remove the proposal from array
            { new: true }
        );

        if (!deleteBidProposal) {
            return res.status(404).json({ error: "Bid not found" });
        }

        res.status(200).json({ message: "Proposal deleted successfully", bid: deleteBidProposal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while deleting proposal" });
    }
};

module.exports = { createProposal, updateProposalStatus, deleteProposal };