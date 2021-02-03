var randomToken = require('random-token')
    .create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
//const { updateOne } = require('../models/Group');
const Game = require('../models/Game')

function createGame(req, res) {
    const game = new Game()

    /**
     * Turno 0 = player 1
     * Turno 1 = player 2 
     */

    const { host, gamemode, area, difficulty, rounds } = req.body
    game.pin = randomToken(8)
    game.host = host
    game.player1 = host
    game.player2 = ""
    game.points_player_1 = 0
    game.points_player_2 = 0
    game.box_player_1 = 0
    game.box_player_2 = 0
    game.turn = Math.floor(Math.random() * 2 + 1)
    game.gamemode = gamemode
    game.area = area
    game.difficulty = difficulty
    game.rounds = rounds
    game.rounds_player1 = 0
    game.rounds_player2 = 0
    /**
     * in_lobby
     * in_game
     * finished
     */
    game.status = "in_lobby"
    game.message = "Partida iniciada"
    game.game_date = new Date()

    if (!host || !gamemode || !difficulty || !area || host === ""
        || gamemode === "" || area === "" || difficulty === "") {
        res.status(500).send({ status: 0, message: "No se permiten campos vacíos." })
    } else {
        game.save((err, game) => {
            if (err) {
                res.status(500).send({ status: 0, message: "Error del servidor." })
            } else {
                if (!game) {
                    res.status(404).send({ status: 0, message: "No se pudo crear la partida." })
                } else {
                    res.status(200).send({
                        status: 1,
                        message: "Partida creada, esperando jugador 2",
                        game: game
                    })
                }
            }
        })
    }
}

/**Función para buscar si el jugador 2 cambió */
function getGameByPin(req, res) {
    const query = req.query

    Game.findOne({ pin: query.pin }, (err, game) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!game) {
                res.status(200).send({ status: 0, message: "No se encontró la partida." })
            } else {
                res.status(200).send({
                    status: 1,
                    message: "Partida encontrada.",
                    game: game
                })
            }
        }
    })
}

/**
 * Función usada para actualizar el jugador 2
 * TODO: Validación para verificar si el jugador 2 es diferente al jugador 1 */
function joinGame(req, res) {
    const query = req.query
    const data = req.body

    Game.findOneAndUpdate({ pin: query.pin }, data, (err, game) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!game) {
                res.status(404).send({ status: 0, message: "No se encontró la partida." })
            } else {
                res.status(200).send({
                    status: 1,
                    message: "Jugador 2 listo.",
                    player2: data.player2
                })
            }
        }
    })
}

/**Función para actualizar todo el juego */
function updateGame(req, res) {
    const query = req.query
    const data = req.body

    Game.findOneAndUpdate({ pin: query.pin }, data, (err, game) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!game) {
                res.status(404).send({ status: 0, message: "No se encontró la partida." })
            } else {
                res.status(200).send({
                    status: 1,
                    message: "Partida modificada."
                })
            }
        }
    })
}

module.exports = {
    createGame,
    getGameByPin,
    joinGame,
    updateGame
}