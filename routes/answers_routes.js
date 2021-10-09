const express = require('express')

var router = express.Router()

const Game = require('../models/game')
const Player = require('../models/player')
const Category = require('../models/category')
const Answer = require('../models/answers')
const Results = require('../models/results')
const MarkingPage = require('../models/marking-page')

let session = require('express-session')

router.get('/api/answers', (req, res) => {
    Answer.all()
        .then(dbRes => {
            res.json({ answers: dbRes.rows })
        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

router.get('/api/answers/playerNames', (req, res) => {
    let gameId = req.session.game_id
    Answer.singleGameAllWithPlayerNames(gameId)
        .then(dbRes => {
            res.json(dbRes.rows)
        })
        .catch(err => {
            res.json({ err })
        })
})

module.exports = router