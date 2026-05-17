const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String
    },

    owner: {
        type: String
    }

});

module.exports =
    mongoose.model(
        "Space",
        spaceSchema
    );