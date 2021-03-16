const mongoose = require('mongoose')


const charSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    portrayed: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Character', charSchema)