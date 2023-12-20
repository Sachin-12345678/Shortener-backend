const express = require('express');
const { authenticate } = require("../middlewares/authenticate.middleware");
const { ShortModel } = require('../models/shortURL');
const Shortrouter = express.Router();

// Shorten a URL:-
Shortrouter.post('/shorten', authenticate, async (req, res) => {
    try {
        const { originalURL } = req.body;
        const shortURL = generateShortURL();

        // Save the short URL in the database
        const newShortURL = new ShortModel({
            originalURL,
            shortURL,
            userID: req.body.user,  
        });

        await newShortURL.save();

        res.json({ originalURL, shortURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Access the original URL:-
Shortrouter.get('/:shortURL', async (req, res) => {
    try {
        const { shortURL } = req.params;

        // Find the original URL in the database
        const urlRecord = await ShortModel.findOne({ shortURL });

        if (!urlRecord) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Redirect to the original URL
        res.redirect(urlRecord.originalURL);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to generate a short URL:-
function generateShortURL() {
    const nanoid = require('nanoid');
    return nanoid.nanoid(8);
}

module.exports = Shortrouter;
