const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubtopicSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    topic: String,
    area: String,
    displayLabel: {
        type: String,
        unique: true
    },
    symbol: {
        type: String,
        unique: true
    },
    active: Boolean
})

module.exports = mongoose.model("Subtopic", SubtopicSchema)