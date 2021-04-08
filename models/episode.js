const mongoose = require('mongoose')


const epsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    episode: {
        type: String,
        required: true
    },
    air_date: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Episode', epsSchema)