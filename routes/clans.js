const router = require('express').Router();
const Clans = require('../models/clans');

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

// get all the clans with paginated results
router.get('/', paginatedResults(Clans), async (req, res) => {
    res.json(res.paginatedResults);
});

// get a clan by name
router.get('/:name', async (req, res) => {
    try {
        // query the db for a clan name including the search term
        const clan = await Clans.findOne({ name: { $regex: req.params.name, $options: 'i' } })
        // if the clan is found, return it
        if (clan) {
            res.status(200).json(clan);
        } else {
            // if the clan is not found, return a 404
            res.status(404).json({ message: 'Clan not found' });
        }
    } catch (e) {
        res.status(500).json(e)
    }
})



module.exports = router;