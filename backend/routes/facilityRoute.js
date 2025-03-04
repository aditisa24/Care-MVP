const express = require('express');
const Facility = require('../models/Facility');
const router = express.Router();

router.get('/facilities', async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.json(facilities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
