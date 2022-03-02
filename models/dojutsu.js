const mongoose = require('mongoose');

const DojutsuSchema = new mongoose.Schema({
    name: {
        type: String
    },
    literalMeaning: {
        type: String
    },
    vizManga: {
        type: String
    },
    about: {
        type: String
    },
    clan: {
        type: Array
    },
    classification: {
        type: Array
    },
    knownWielders: {
        type: Array
    },
    jutsu: {
        type: Array
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Dojutsu', DojutsuSchema);