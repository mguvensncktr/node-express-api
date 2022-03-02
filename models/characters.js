const mongoose = require("mongoose");

const CharactersSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    sex: {
        type: String,
    },
    affiliations: {
        type: Array,
    },
    birthdate: {
        type: String,
    },
    age: {
        type: Array,
    },
    bloodType: {
        type: String,
    },
    status: {
        type: String,
    },
    kekkeiGenkai: {
        type: Array,
    },
    classification: {
        type: Array,
    },
    tailedBeasts: {
        type: Array,
    },
    occupation: {
        type: Array,
    },
    team: {
        type: Array,
    },
    clan: {
        type: Array,
    },
    rank: {
        ninjaRank: {
            type: Array,
        },
        acadGradAge: {
            type: String,
        }
    },
    family: {
        type: Array,
    },
    about: {
        type: String
    },
    natureType: {
        type: Array
    },
    jutsu: {
        type: Array
    }
});

module.exports = mongoose.model("Characters", CharactersSchema);