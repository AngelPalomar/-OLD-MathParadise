const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExcerciseSchema = Schema({
    label: {
        type: String,
        unique: true
    },
    option_a: String,
    option_b: String,
    option_c: String,
    option_d: String,
    answer: String,
    area: String,
    topic: String,
    subtopic: String,
    difficulty: String
})

module.exports = mongoose.model("Excercise", ExcerciseSchema)