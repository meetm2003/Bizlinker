require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 2333;

const connectDB = require("./database/connection");
const userRoute = require("./routes/user.route");
const maketplaceRoute = require("./routes/marketplace.route");
const referralRoute = require("./routes/referral.route");

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));

// User Routes
app.use("/api", userRoute);

// Marketplace Routes
app.use("/api", maketplaceRoute);

// Referral Routes
app.use("/api", referralRoute);

const start = async () => {
    try{
        await connectDB(process.env.MongoDB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} Port is Connected...`);
        });
    } catch(err) {
        console.log(err);
    }
}

start();