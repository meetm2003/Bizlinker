require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 2333;

const connectDB = require("./database/connection");
<<<<<<< HEAD
const authRoute = require("./routes/auth.route");
=======
const authRoute = require("./routes/auth.route")
>>>>>>> 1c62170e4f8d3ed68182907be35c41edffa643bb
const userRoute = require("./routes/user.route");
const maketplaceRoute = require("./routes/marketplace.route");
const referralRoute = require("./routes/referral.route");
const postRoute = require("./routes/postCollection.route");
const messageRoute = require("./routes/message.route");

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));

// Auth Routes
app.use("/api", authRoute);

// User Routes
app.use("/api", userRoute);

// Marketplace Routes
app.use("/api", maketplaceRoute);

// Referral Routes
app.use("/api", referralRoute);

// Post Collection Routes
app.use("/api", postRoute);

// Message Routes
app.use("/api", messageRoute);

const start = async () => {
    try {
        await connectDB(process.env.MongoDB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} Port is Connected...`);
        });
    } catch (err) {
        console.log(err);
    }
}

start();

