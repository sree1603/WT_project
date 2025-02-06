require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order Route
app.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;  // Amount in INR (e.g., 500 for ₹500)
        const options = {
            amount: amount * 100,  // Convert INR to paise (₹500 → 50000)
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).send("Error creating order");
    }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
