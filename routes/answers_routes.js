const express = require('express')

var router = express.Router()

const Category = require('../models/category.js')
const Game = require('../models/game.js')
const Player = require('../models/player.js')
const Answer = require('../models/answers.js')

const db = require('../db/db')
let session = require('express-session')

router.get('/api/answers', (req, res) => {
    Answer.all()
        .then(dbRes => {
            res.json({ answers: dbRes.rows })
        })
        .catch(err => {
            res.json({ err })
        })
})

router.get('/api/answers/playerNames', (req, res) => {
    Answer.allWithPlayerNames()
        .then(dbRes => {
            res.json({ answers: dbRes.rows })
        })
        .catch(err => {
            res.json({ err })
        })
})