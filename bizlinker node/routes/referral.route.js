const express = require("express");
const router = express.Router();
const { createReferral, getAllReferrals, updateReferral, deleteReferral, createFeedback, createReferrer, updateReferrerStatus } = require("../controllers/referral.controller");

router.get("/referrals", getAllReferrals);
router.post("/referrals", createReferral);
router.post("/referrals/:referralId/referrers", createReferrer);
router.put("/referrals/:referralId/referrers/:referrerId", updateReferrerStatus);
router.put("/referrals/:referralId", updateReferral);
router.delete("/referrals/:referralId", deleteReferral);
router.post("/referrals/feedback/:referralId", createFeedback);

module.exports = router;