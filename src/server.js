require("dotenv").config();
console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an Order
app.post("/create-order", async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100, // Amount in paise (₹1 = 100 paise)
            currency: "INR",
            receipt: `order_rcptid_${Date.now()}`,
            payment_capture: 1, // Auto capture
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify Payment
app.post("/verify-payment", (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(order_id + "|" + payment_id)
        .digest("hex");

    if (expectedSignature === signature) {
        res.json({ success: true, message: "Payment verified successfully!" });
    } else {
        res.status(400).json({ success: false, message: "Invalid payment signature!" });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
