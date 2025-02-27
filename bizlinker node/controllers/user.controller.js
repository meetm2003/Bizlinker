const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// Get all users
const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

// Get user by email
const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.params.email
        }); // Find user by email

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create the user
const createUser = async (req, res) => {

    // console.log(req.body);

    // get data from req.body
    const { name, email, phone, passwordHash, role, dob, businessPortfolio, profilePic, feedback, skills, verified } = req.body;

    // If role is 'user', ensure businessPortfolio is not included
    if (role === "user" && businessPortfolio) {
        return res.status(400).json({
            error: "Users cannot have a business portfolio."
        });
    }

    // If role is 'business_owner', ensure businessPortfolio is provided and valid
    if (role === "business_owner" && (!businessPortfolio || businessPortfolio.length === 0)) {
        return res.status(400).json({
            error: "Business owners must have at least one business in the portfolio."
        });
    }

    // If business owner has a portfolio, validate its structure
    if (role === "business_owner" && businessPortfolio) {
        // Check if the first item in businessPortfolio has the required fields
        const isValidPortfolio = businessPortfolio.every(portfolio =>
            portfolio.title && portfolio.description && portfolio.projects
        );

        if (!isValidPortfolio) {
            return res.status(400).json({ error: "Each business portfolio must have a title, description, and at least one project." });
        }
    }

    if (!passwordHash || passwordHash.trim() === "") {
        return res.status(400).json({
            error: "Password is required"
        });
    }

    let hashedPassword = await bcrypt.hash(passwordHash, 10);

    // put data in user model
    const newUser = new User({
        name,
        email,
        phone,
        passwordHash: hashedPassword,
        role,
        dob,
        businessPortfolio,
        feedback,
        profilePic,
        skills,
        verified,
    });

    try {
        // save that data in database
        await newUser.save();

        res.status(201).json({
            message: "User Created Successfully",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// add business portfolio
const addBusinessPortfolio = async (req, res) => {
    const { userId } = req.params;
    const { title, description, regCertificate, businessLicense, taxCertificate, projects, location, branch } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    businessPortfolio: {
                        title,
                        description,
                        regCertificate,
                        businessLicense,
                        taxCertificate,
                        projects,
                        location,
                        branch,
                    },
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Business portfolio added successfully", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while adding business portfolio" });
    }
};

// add feed back
const addFeedback = async (req, res) => {
    const { userId } = req.params;
    const { rating, review } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    feedback: {
                        userId,
                        rating,
                        review,
                    },
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Feedback added successfully", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while adding feedback" });
    }
};


// Update the user
const updateUser = async (req, res) => {

    const { id } = req.params; // Get user ID from the URL parameter
    const { name, email, phone, passwordHash, role, dob, verified, businessPortfolio } = req.body;

    // Find the user by ID and update the fields
    const updatedUser = await User.findByIdAndUpdate(
        id,
        {
            name,
            email,
            phone,
            passwordHash,
            role,
            dob,
            verified,
            businessPortfolio,
        },
        { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
        return res.status(404).json({
            error: "User not found"
        });
    }
    try {
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {

    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        return res.status(404).json({
            error: "User not found"
        });
    }
    try {
        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
};

// Delete user when varified is false
const deleteDisproveUser = async (req, res) => {

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    try {
        console.log("called");
        
        const result = await User.deleteMany({
            verified: false,
            createdAt: { $lt: fiveMinutesAgo },
        });
        console.log(result);
        

        res.status(200).json({
            message: "Users are deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = { getAllUsers, getUserByEmail, createUser, updateUser, deleteUser, addBusinessPortfolio, addFeedback, deleteDisproveUser };