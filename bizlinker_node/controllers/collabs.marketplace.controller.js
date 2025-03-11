const MarketPlace = require("../models/marketplace.model");

// get all collabs
const getAllCollabs = async (req, res) => {
    const collabs = await MarketPlace.find({ type: "collabs" });
    res.status(200).json(collabs);
};

// create collab
const createCollab = async (req, res) => {

    const { type, title, description, category, ownerId, location, deadline } = req.body;

    if (type !== "collabs") {
        return res.status(400).json({ error: "Invalid type. Only 'collab' can be created here." });
    }

    if (!ownerId || !title || !description || !category || !location || !deadline === undefined) {
        return res.status(400).json({ error: "All fields are required for creating collab." });
    }

    const newCollab = new MarketPlace({
        type,
        title,
        description,
        category,
        ownerId,
        location,
        deadline,
    });

    try {
        await newCollab.save();
        res.status(201).json({ message: "Collab created successfully", collab: newCollab, });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error while creating collab" });
    }

};

// update collab
const updateCollab = async (req, res) => {
    try {
        const { collabId } = req.params;
        const { title, description, category, location, deadline, proposals } = req.body;

        // Find and update collab
        const updatedCollab = await MarketPlace.findByIdAndUpdate(
            collabId,
            { title, description, category, location, deadline, proposals }, // Only update provided fields
            { new: true } // Return updated collab & apply schema validation
        );

        if (!updatedCollab) {
            return res.status(404).json({ error: "Collab not found" });
        }

        if (updatedCollab.type !== "collabs") {
            return res.status(400).json({ error: "Invalid update. This entry is not a collab." });
        }

        res.status(200).json({ message: "Collab updated successfully", collab: updatedCollab });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error while updating collab" });
    }
};


// delete collab
const deleteCollab = async (req, res) => {
    try {
        const { collabId } = req.params;

        // Find and delete collab
        const collab = await MarketPlace.findByIdAndDelete(collabId);
        if (!collab) {
            return res.status(404).json({ error: "Collab not found" });
        }

        // Ensure it's a "collab" type entry
        if (collab.type !== "collabs") {
            return res.status(400).json({ error: "Invalid deletion. This entry is not a collab." });
        }

        res.status(200).json({ message: "Collab deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error while deleting collab" });
    }
};


module.exports = { getAllCollabs, createCollab, updateCollab, deleteCollab };