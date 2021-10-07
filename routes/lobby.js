var express = require('express')
var router = express.Router()

const Players = require('../models/player')

router.get('/api/lobby', (req, res) => {

    let playerId = req.session.user_id

    Players.updateTimeStamp(playerId)
        .then(dbRes => {
            let gameId = dbRes.rows[0].game_id
            return Players.getAllActive(gameId)
        })
        .then(dbRes => {
            let gameId = dbRes.rows[0].game_id
            res.json({ players: dbRes.rows, gameId })
        })
        .catch(err => {
            res.json({ message: err.message })
        })
})

router.get('/lobby', (req, res) => {
    res.render('lobby')
})

module.exports = router