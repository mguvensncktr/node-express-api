const mongoose = require('mongoose');

const ClanSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    affiliation: {
        type: String,
    },
    clanMembers: {
        type: Array,
    },
    clanImage: {
        type: String,
    },
    clanJutsuList: {
        type: Array,
    }
})

module.exports = mongoose.model('Clan', ClanSchema);