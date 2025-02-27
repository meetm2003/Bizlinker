const User = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

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

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(401).json({ error: "User not found" });
    }

    const hashedPassword = hashPassword(password);
    if(hashedPassword !== user.passwordHash){
        return res.status(401).json({ error: "Invalid email or password" });
    }

    if(!user.verified){
        return res.status(403).json({ error: "Email not verified. Please verify your email first." });
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

module.exports = { loginUser, refreshToken };