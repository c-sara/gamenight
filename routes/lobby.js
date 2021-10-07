var express = require('express')
var router = express.Router()

const { Pool } = require('pg')
const db = new Pool({
    database: 'gamenight'
})

const Players = require('../models/player')

router.get('/api/lobby', (req, res) => {

    let playerId = req.session.user_id

    Players.updateTimeStamp(playerId)
        .then(dbRes => {
            let gameId = dbRes.rows[0].game_id
            Players.getAllActive(gameId)
                .then(secDbRes => {
                    res.json({ players: secDbRes.rows, gameId })
                })
                .catch(err => {
                    console.log(err.message)
                })
        })
        .catch(err => {
            res.json({ message: err.message })
        })
    
    
})

router.get('/lobby', (req, res) => {

    res.render('lobby')
})

module.exports = router