const express = require("express");

const router = express.Router();

const Space = require("../models/Space");


// GET ALL SPACES
router.get("/", async(req, res) => {

    try {

        const spaces =
            await Space.find();

        res.json(spaces);

    } catch (error) {

        res.status(500).json(error);
    }
});


// ADD SPACE
router.post("/add", async(req, res) => {

    try {

        const {
            title,
            location,
            price,
            image,
            owner
        } = req.body;

        const newSpace =
            new Space({

                title,
                location,
                price,
                image,
                owner

            });

        await newSpace.save();

        res.status(201).json({
            message: "Space Added Successfully"
        });

    } catch (error) {

        res.status(500).json(error);
    }
});


// OWNER SPACES
router.get("/owner/:owner", async(req, res) => {

    try {

        const spaces =
            await Space.find({

                owner: req.params.owner
            });

        res.json(spaces);

    } catch (error) {

        res.status(500).json(error);
    }
});

module.exports = router;