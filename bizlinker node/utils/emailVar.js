require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    secure: process.env.SMTP_SECURE === "true",
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Connection Error:", error);
    } else {
        // console.log("SMTP Connected Successfully");
    }
});

const sendVerificationMail = async (email, verificationCode) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Email Verification Code",
            text: `Hello, Your verification code is: ${verificationCode}`,
        });
        // console.log("Verification email sent to:", email);
    } catch (err) {
        console.error("Error sending email:", err)
    }
};

module.exports = { sendVerificationMail };