const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const spaceRoutes =
    require("./routes/spaces");
const authRoutes =
    require("./routes/authRoutes");
const bookingRoutes =
    require("./routes/bookingRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/spaces", spaceRoutes);
app.use("/api/auth", authRoutes);
app.use(
    "/api/bookings",
    bookingRoutes
);


app.get("/", (req, res) => {
    res.send("SpotFlex Backend Running 🚀");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.listen(5000, () => {
    console.log("Server running on port 5000");
    console.log(process.env.MONGO_URI);
});