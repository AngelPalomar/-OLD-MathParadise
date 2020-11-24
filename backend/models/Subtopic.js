const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubtopicSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    topic: String,
    displayLabel: {
        type: String,
        unique: true
    },
    symbol: {
        type: String,
        unique: true
    },
    primaryColor: String,
    secondaryColor: String
})

module.exports = mongoose.model("Subtopic", SubtopicSchema)