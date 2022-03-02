
const router = require('express').Router();
const Dojutsu = require('../api/models/dojutsu');


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

// get all the information about dojutsus with a paginated results
router.get('/', paginatedResults(Dojutsu), async (req, res) => {
    res.json(res.paginatedResults);
});

// get the information about a dojutsu by name
router.get('/:name', async (req, res) => {
    try {
        // query the db for a dojutsu name including the search term
        const dojutsu = await Dojutsu.findOne({ name: { $regex: req.params.name, $options: 'i' } });
        // if the dojutsu is found, return it
        if (dojutsu) {
            res.status(200).json(dojutsu);
        } else {
            // if the dojutsu is not found, return a 404
            res.status(404).json({ message: 'Dojutsu not found' });
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router;


