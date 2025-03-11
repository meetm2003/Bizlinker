const express = require("express");
const router = express.Router();

const { getAllBids, createBid, updateBid, deleteBid } = require("../controllers/bids.marketplace.controller");
const { getAllCollabs, createCollab, updateCollab, deleteCollab } = require("../controllers/collabs.marketplace.controller");
const { createProposal, updateProposalStatus, deleteProposal } = require("../controllers/proposals.marketplace.controller");

// Marketplace for bids
router.get("/marketplace/bids", getAllBids);
router.post("/marketplace/bids", createBid);
router.put("/marketplace/bids/:bidId", updateBid);
router.delete("/marketplace/bids/:bidId", deleteBid);

// Marketplace for Collabs
router.get("/marketplace/collabs", getAllCollabs);
router.post("/marketplace/collabs", createCollab);
router.put("/marketplace/collabs/:collabId", updateCollab);
router.delete("/marketplace/collabs/:collabId", deleteCollab);

// Proposal for both
router.post("/marketplace/:marketplaceId/proposals", createProposal);
router.put("/marketplace/:marketplaceId/proposals/:proposalId", updateProposalStatus);
router.delete("/marketplace/:marketplaceId/proposals/:proposalId", deleteProposal);
module.exports = router;