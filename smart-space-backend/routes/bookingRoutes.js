const express = require("express");

const router = express.Router();

const Booking =
    require("../models/Booking");


// ================= CREATE BOOKING =================

router.post("/create", async(req, res) => {

    try {

        const booking =
            new Booking(req.body);

        await booking.save();

        res.status(201).json({

            message: "Booking Successful 🚀"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


// ================= USER BOOKINGS =================

router.get("/user/:userId", async(req, res) => {

    try {

        const bookings =
            await Booking.find({

                userId: req.params.userId

            });

        res.json(bookings);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

module.exports = router;