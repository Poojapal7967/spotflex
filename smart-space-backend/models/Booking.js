const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    spaceId: {
        type: String,
        required: true
    },

    spaceTitle: {
        type: String,
        required: true
    },

    location: {
        type: String
    },

    price: {
        type: Number
    },

    date: {
        type: String
    },

    startTime: {
        type: String
    },

    endTime: {
        type: String
    },

    bookingDate: {
        type: Date,
        default: Date.now
    }

});

module.exports =
    mongoose.model(
        "Booking",
        bookingSchema
    );