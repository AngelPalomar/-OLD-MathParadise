const History = require('../models/History')

function CreateHistory(req, res) {
    const body = req.body
    const history = new History();

    history.nickname = body.nickname;
    history.enemy_nickname = body.enemy_nickname;
    history.game_date = new Date();
    history.gamemode = body.gamemode;
    history.area = body.area;
    history.difficulty = body.difficulty;
    history.points = body.points;
    history.enemy_points = body.enemy_points;
    history.result = body.result;
    history.excercises = body.excercises;
    history.correct_excercises = body.correct_excercises;
    history.wrong_excercises = body.wrong_excercises;
    history.multiplier = body.multiplier;
    history.level = body.level;
    history.rounds = body.rounds;

    history.save((err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor.", err: err })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se pudo crear el registro de la partida." })
            } else {
                res.status(200).send({
                    status: 1,
                    message: "Registro de partida guardada.",
                    history: result
                })
            }
        }
    })
}

function GetHistoryByNickname(req, res) {
    const params = req.params
    History.find({ nickname: params.nickname }, null, { sort: '-game_date' }, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!result) {
                res.status(200).send({ status: 0, message: "No se encontró la partida." })
            } else {
                res.status(200).send({
                    status: 1,
                    message: "Partida encontrada.",
                    history: result
                })
            }
        }
    }).limit(15)
}

module.exports = {
    CreateHistory,
    GetHistoryByNickname
}