const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HistorySchema = Schema({
    nickname: String,
    enemy_nickname: String,
    game_date: Date,
    gamemode: String,
    area: String,
    difficulty: String,
    points: Number,
    enemy_points: Number,
    result: 'victory' | 'defeat' | 'draw' | 'none',
    excercises: Number,
    correct_excercises: Number,
    wrong_excercises: Number,
    multiplier: Number,
    level: Number,
    rounds: Number
})

module.exports = mongoose.model("History", HistorySchema)