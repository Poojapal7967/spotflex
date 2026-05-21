const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

const toMinutes = (time) => {
    if (!time || !time.includes(":")) return NaN;
    const [hours, minutes] = time.split(":").map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return NaN;
    return hours * 60 + minutes;
};

const getBookingStatus = (booking) => {
    if (booking.status === "cancelled") return "cancelled";
    const endDateTime = new Date(`${booking.date}T${booking.endTime}`);
    if (Number.isNaN(endDateTime.getTime())) return "upcoming";
    return endDateTime < new Date() ? "completed" : "upcoming";
};

const validateDateAndTime = (date, startTime, endTime) => {
    if (!date || !startTime || !endTime) {
        return "Date, start time and end time are required";
    }

    const startMinutes = toMinutes(startTime);
    const endMinutes = toMinutes(endTime);
    if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes)) {
        return "Invalid time format";
    }
    if (endMinutes <= startMinutes) {
        return "End time must be greater than start time";
    }

    const startDateTime = new Date(`${date}T${startTime}`);
    if (Number.isNaN(startDateTime.getTime())) {
        return "Invalid date/time value";
    }
    if (startDateTime < new Date()) {
        return "Cannot create/update booking for past time slot";
    }

    return null;
};

const hasSlotConflict = async(spaceId, date, startTime, endTime, excludeId) => {
    const query = {
        spaceId,
        date,
        status: {
            $ne: "cancelled"
        }
    };

    if (excludeId) {
        query._id = {
            $ne: excludeId
        };
    }

    const existingBookings = await Booking.find(query);
    const requestedStart = toMinutes(startTime);
    const requestedEnd = toMinutes(endTime);

    return existingBookings.some((booking) => {
        const existingStart = toMinutes(booking.startTime);
        const existingEnd = toMinutes(booking.endTime);
        return requestedStart < existingEnd && requestedEnd > existingStart;
    });
};

// ================= CREATE BOOKING =================
router.post("/create", async(req, res) => {
    try {
        const {
            userId,
            userName,
            spaceId,
            spaceTitle,
            date,
            startTime,
            endTime
        } = req.body;

        if (!userId || !userName || !spaceId || !spaceTitle) {
            return res.status(400).json({
                message: "Required booking details are missing"
            });
        }

        const dateTimeError = validateDateAndTime(date, startTime, endTime);
        if (dateTimeError) {
            return res.status(400).json({
                message: dateTimeError
            });
        }

        const conflict = await hasSlotConflict(spaceId, date, startTime, endTime);
        if (conflict) {
            return res.status(400).json({
                message: "Selected slot is already booked"
            });
        }

        const booking = new Booking({
            ...req.body,
            status: "upcoming"
        });

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
        const bookings = await Booking.find({
            userId: req.params.userId
        }).sort({
            bookingDate: -1
        });

        const enrichedBookings = bookings.map((booking) => {
            const data = booking.toObject();
            return {
                ...data,
                computedStatus: getBookingStatus(data)
            };
        });

        res.json(enrichedBookings);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ================= CANCEL BOOKING =================
router.put("/:id/cancel", async(req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking is already cancelled"
            });
        }

        booking.status = "cancelled";
        booking.cancelledAt = new Date();
        await booking.save();

        res.json({
            message: "Booking cancelled successfully",
            booking
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ================= RESCHEDULE BOOKING =================
router.put("/:id/reschedule", async(req, res) => {
    try {
        const {
            date,
            startTime,
            endTime
        } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Cancelled booking cannot be rescheduled"
            });
        }

        const currentStatus = getBookingStatus(booking);
        if (currentStatus === "completed") {
            return res.status(400).json({
                message: "Completed booking cannot be rescheduled"
            });
        }

        const dateTimeError = validateDateAndTime(date, startTime, endTime);
        if (dateTimeError) {
            return res.status(400).json({
                message: dateTimeError
            });
        }

        const conflict = await hasSlotConflict(booking.spaceId, date, startTime, endTime, booking._id);
        if (conflict) {
            return res.status(400).json({
                message: "Selected slot is already booked"
            });
        }

        booking.date = date;
        booking.startTime = startTime;
        booking.endTime = endTime;
        booking.status = "upcoming";
        booking.cancelledAt = null;
        await booking.save();

        res.json({
            message: "Booking rescheduled successfully",
            booking
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
