var express = require('express')
const db = require('../db/db')
var router = express.Router()

const Player = require('../models/player')
const MarkingPage = require('../models/marking-page')

router.get('/api/players', (req, res) => {
    Player.getAll()
        .then(dbRes => {
            res.json({players: dbRes.rows})
        })
        .catch(err => {
            res.json({message: err.message})
        })
})

//update to filter by game_id
router.get('/api/marking-page/:game_id', (req, res) => {
    //send the client all the player score info stored in players table
    var gameId = req.params.game_id

    MarkingPage.getScores(gameId)
        .then(dbRes => {
            res.json(dbRes.rows)
        })
        .catch(err => {
            console.log(err)
            res.json({ err: err.message })
        })
})

//update to filter by game_id
router.put('/api/marking-page', (req, res) => {
    var instruction = req.body.scoreChange
    var userId = req.body.btnOwner

    MarkingPage.incrementScore(userId, instruction)
        .then( () => {
            res.json( {} )
        })
        .catch(err => {
            console.log(err)
            res.json({ err: err.message })
        })
})

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