const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = Schema({
    pin: {
        type: String,
        unique: true
    },
    host: String,
    player1: String,
    player2: String,
    points_player_1: Number,
    points_player_2: Number,
    turn: Number,
    box_player_1: Number,
    box_player_2: Number,
    gamemode: String,
    area: String,
    difficulty: String,
    time: Number,
    game_date: Date,
    status: String,
    board: []
})

module.exports = mongoose.model("Game", GameSchema)