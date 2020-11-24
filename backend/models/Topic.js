const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    area: String
})

module.exports = mongoose.model("Topic", TopicSchema)