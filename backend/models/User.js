const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: String,
    lastname: String,
    nickname: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active: Boolean,
    classic: {
        points: Number,
        excercises: Number,
        right_excercises: Number,
        mistakes: Number,
        victories: Number,
        defeats: Number
    },
    arcade: {
        points: Number,
        excercises: Number,
        right_excercises: Number,
        mistakes: Number,
        victories: Number,
        defeats: Number
    },
    rush: {
        points: Number,
        excercises: Number,
        level: Number,
        multiplier: Number
    }
})

module.exports = mongoose.model("User", UserSchema)