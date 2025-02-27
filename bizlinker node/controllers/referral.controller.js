const Referrals = require("../models/referral.model");

const createReferral = async (req, res) => {

    const { requesterId, companyName, purpose } = req.body;

    if (!requesterId || !companyName || !purpose ) {
        return res.status(400).json({ error: "All details are required..." });
    }

    const newReferral = new Referrals({
        requesterId,
        companyName,
        purpose,
    });

    try {
        await newReferral.save();
        res.status(201).json({ message: "Referral request created successfully", referral: newReferral });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error while creating referral" });
    }
};

const createReferrer = async (req, res) => {
    const { referralId } = req.params;
    const { referrerId, message } = req.body;

    const referral = await Referrals.findById(referralId);

    if (!referral) {
        return res.status(404).json({ error: "Referral not found" });
    }

    if (!referrerId || !message) {
        return res.status(400).json({ error: "Referrer ID and message are required" });
    }

    const newReferrer = {
        referrerId,
        status: "Pending",
        message,
    };

    try {
        referral.referrers.push(newReferrer);
        await referral.save();

        res.status(201).json({ message: "Referrer added successfully", referrers: referral.referrers });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error while updating the referrer data" });
    }
};

const updateReferrerStatus = async (req, res) => {
    const { referralId, referrerId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Accepted", "Declined"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }

    try {
        const updatedReferral = await Referrals.findOneAndUpdate(
            { _id: referralId, "referrers._id": referrerId },
            { $set: { "referrers.$.status": status } },
            { new: true }
        );

        if (!updatedReferral) {
            return res.status(404).json({ error: "Referrer or Referral not found" });
        }

        res.status(200).json({ message: "Referrer status updated successfully", bid: updatedReferral });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while updating Referrer status" });
    }
};

const getAllReferrals = async (req, res) => {
    try {
        const referrals = await Referrals.find();
        res.status(200).json(referrals);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error while getting the data of referral" });
    }
};

const updateReferral = async (req, res) => {
    const { referralId } = req.params;
    const { requesterId, companyName, purpose, referrers } = req.body;

    try {
        const updateReferral = await Referrals.findByIdAndUpdate(referralId, { requesterId, companyName, purpose, referrers, }, { new: true });

        if (!updateReferral) {
            return res.status(404).json({ error: "Collab not found" });
        }

        res.status(200).json({ message: " Referral updated successfully", Referral: updateReferral });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error while updating the referral data" });
    }
};

const deleteReferral = async (req, res) => {
    const { referralId } = req.params;
    try {
        const deletedReferral = await Referrals.findByIdAndDelete(referralId);

        if (!deletedReferral) {
            return res.status(404).json({ error: "Referral not Found" });
        }

        res.status(200).json({ message: "Referral deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error while updating the referral data" });
    }
};

const createFeedback = async (req, res) => {
    const { referralId } = req.params;
    const { userId, rating, review } = req.body;

    const referral = await Referrals.findById(referralId);

    if (!referral) {
        return res.status(404).json({ error: "Collab not found" });
    }

    if (!userId || !rating || !review) {
        return res.status(400).json({ error: "User ID, Rating and review are required" });
    }

    const newFeedback = {
        userId,
        rating,
        review,
    };

    try {
        referral.feedback.push(newFeedback);
        await referral.save();

        res.status(201).json({ message: "Feedback added successfully", feedback: newFeedback });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error while updating the referral data" });
    }
};

module.exports = { createReferral, getAllReferrals, updateReferral, deleteReferral, createFeedback, createReferrer, updateReferrerStatus };