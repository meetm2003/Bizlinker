const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    if (!user || !user._id) {
        throw new Error("User ID is required to generate a token");
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in environment variables");
    }

    return jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
    const { name, email, phone, passwordHash, role, dob, profilePic, skills } = req.body;
    const existingUser = await User.findOne({ email });

    if (!passwordHash && !name && !email && !phone && !role && !dob && !profilePic && !skills) {
        return res.status(400).json({ error: "Some value is undefined" });
    }

    if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwordHash, saltRounds);
    const newUser = new User({ name, email, phone, passwordHash: hashedPassword, role, dob, profilePic, skills });

    try {
        await newUser.save();
        res.status(201).json({ message: "User Registered Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during registration" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);
    const user = await User.findOne({ email });
    // console.log(user);
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!user || !isMatch) {
        return res.status(401).json({ error: "Invalid email or password " });
    }

    try {
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({ token, refreshToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during login" });
    }
};

const refreshToken = async (req, res) => {
    const { token } = req.body;

    if (!token) return res.status(401).json({ error: "Refresh token required" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const newToken = generateToken({ _id: decoded.id });

        res.json({ token: newToken });

    } catch (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
    }
};

module.exports = { registerUser, loginUser, refreshToken };