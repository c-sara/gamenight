const express = require('express')

var router = express.Router()

const Category = require('../models/category.js')
const Game = require('../models/game.js')
const Player = require('../models/player.js')
const Answer = require('../models/answers.js')

const db = require('../db/db')
let session = require('express-session')

router.post('/marking-page/:game_id', (req, res) => {

    var gameId = req.params.game_id
    var categoriesAndAnswers = JSON.stringify(req.body)

    Answer.create(gameId, req.session.user_id, categoriesAndAnswers)
        .then(dbRes => {
            return Answer.singleGameAllWithPlayerNames(gameId)
        })
        .then(dbRes => {
            var answers = dbRes.rows
            var catIdsInGame = Object.keys(answers[0].player_ans)
            Category.getCategoriesByCatId(catIdsInGame)
                .then(dbRes => {
                    var categoryNamesInGame = dbRes.rows
                    res.render('marking-page', { answers, categoryNamesInGame })
                })
        })
        .catch(err => {
            console.log(err)
            res.json({ err: err.message })
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

module.exports = router