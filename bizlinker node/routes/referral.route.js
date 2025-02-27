const express = require("express");
const router = express.Router();
const { createReferral, getAllReferrals, updateReferral, deleteReferral, createFeedback, createReferrer, updateReferrerStatus } = require("../controllers/referral.controller");

router.get("/referrals", getAllReferrals);
router.post("/referrals", createReferral);
router.post("/referrals/:referralId/referrers", createReferrer);
router.put("/referrals/:referralId/referrers/:referrerId", updateReferrerStatus);
router.put("/referral/:referralId", updateReferral);
router.delete("/referral/:referralId", deleteReferral);
router.post("/referral/feedback/:referralId", createFeedback);

module.exports = router;