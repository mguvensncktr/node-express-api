const router = require('express').Router();
const Character = require('../api/models/characters');


function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {}

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = results;
            next();
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    }
}

// get all characters with a paginated results
router.get('/', paginatedResults(Character), async (req, res) => {
    res.json(res.paginatedResults);
});

// get the character info by name
router.get('/:name', async (req, res) => {
    try {
        // query the db for a character name including the search term
        const character = await Character.findOne({ name: { $regex: req.params.name, $options: 'i' } });
        // if the character is found, return it
        if (character) {
            res.status(200).json(character);
        } else {
            // if the character is not found, return a 404
            res.status(404).json({ message: 'Character not found' });
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

// get all the characters from a clan
router.get('/clan/:clan', async (req, res) => {
    try {
        // query the db for a clan name including the search term
        const characters = await Character.find({ clan: { $regex: req.params.clan, $options: 'i' } });
        // if the clan is found, return it
        if (characters) {
            res.status(200).json(characters);
        } else {
            // if the clan is not found, return a 404
            res.status(404).json({ message: 'No character found for this clan' });
        }
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router;