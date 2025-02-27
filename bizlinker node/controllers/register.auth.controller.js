const User = require("../models/user.model");
const crypto = require("crypto");
const { registerUserValidator, loginUserValidator } = require("../validators/user.validator");
const { sendVerificationMail } = require("../utils/emailVar");

const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

const registerUser = async (req, res) => {
    const { err } = registerUserValidator.validate(req.body);
    if (err) {
        return res.status(400).json({ message: err.details[0].message });
    }

    const { name, email, phone, passwordHash, role, dob, profilePic, skills } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = hashPassword(passwordHash);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
        name,
        email,
        phone,
        passwordHash: hashedPassword,
        role,
        dob,
        profilePic,
        skills,
        verified: false,
        verificationCode,
    });

    try {
        await newUser.save();

        await sendVerificationMail(email, verificationCode);

        res.status(201).json({ message: "Verification email sent" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during registration" });
    }
};

const verifyUser = async (req, res) => {
    const { email, verificationCode } = req.body;
    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ error: "Invalid verification code" });
        }

        user.verified = true;
        user.verificationCode = null;
        await user.save();

        res.status(200).json({ message: "User Verified successfully!!!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during verifing user" });
    }
};

module.exports = { registerUser, verifyUser };