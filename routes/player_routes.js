var express = require('express')
var router = express.Router()

const Player = require('../models/player')


router.get('/api/players', (req, res) => {
    Player.getAll()
        .then(dbRes => {
            res.json({players: dbRes.rows})
        })
        .catch(err => {
            res.json({message: err.message})
        })
})

router.patch('/api/players/:id', (req, res) => {
    let playerId = req.params.id
    Player.updatePlayerReady(playerId)
        .then(dbRes => {
            res.json({ player: "updated" })
        })
        .catch(err => {
            res.json({ message: err.message})
        })
})

module.exports = router