var express = require('express')
const db = require('../db/db')
var router = express.Router()

const Player = require('../models/player')
const MarkingPage = require('../models/marking-page')

// gets all players
router.get('/api/players', (req, res) => {
    Player.getAll()
        .then(dbRes => {
            res.json({players: dbRes.rows})
        })
        .catch(err => {
            res.json({message: err.message})
        })
})

// updates player status to ready
router.patch('/api/players/:id', (req, res) => {
    let playerId = req.params.id
    Player.updatePlayerReady(playerId)
        .then(dbRes => {
            res.json({ player: dbRes.rows[0] })
        })
        .catch(err => {
            res.json({ message: err.message})
        })
})

module.exports = router