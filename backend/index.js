const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const ListingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: String,
  email: String,
  verified: { type: Boolean, default: false },
});
const Listing = mongoose.model("Listing", ListingSchema);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/post-listing", async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    await newListing.save();
    const verifyUrl = `http://localhost:5000/verify/${newListing._id}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Xác thực tin đăng",
      text: `Vui lòng xác nhận tin đăng của bạn: ${verifyUrl}`,
    };
    transporter.sendMail(mailOptions);
    res.json({ message: "Vui lòng kiểm tra email để xác thực tin đăng" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi đăng tin" });
  }
});

app.get("/verify/:id", async (req, res) => {
  try {
    await Listing.findByIdAndUpdate(req.params.id, { verified: true });
    res.send("Tin đăng đã được xác thực");
  } catch (error) {
    res.status(500).send("Lỗi xác thực tin đăng");
  }
});

app.get("/featured-listings", async (req, res) => {
  const listings = await Listing.find({ verified: true }).limit(5);
  res.json(listings);
});

app.listen(5000, () => console.log("Server running on port 5000"));
