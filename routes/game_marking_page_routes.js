const express = require('express')

var router = express.Router()

const Category = require('../models/category.js')
const Game = require('../models/game.js')
const Player = require('../models/player.js')
const Answer = require('../models/answers.js')

const db = require('../db/db')
let session = require('express-session')

router.get('/game/:game_id', (req, res) => {
    var gameId = req.params.game_id
    Category.getCategoriesByGameId(gameId)
        .then(dbRes => {
            var categoryIdsArr = dbRes.rows[0].categories.map(item => Number(item))
            var categoryIdsStr = categoryIdsArr.toString()
            return db.query(`SELECT * FROM categories WHERE cat_id IN (${categoryIdsStr});`) 
        })
        .then(dbRes => {
            var categoryData = dbRes.rows
            res.render('game', { user_id: req.session.user_id, categoryData, gameId })
        })
})

// gets game_id by player
router.get('/api/players/', (req, res) => {
    let playerId = req.session.user_id

    // get game id from player id 
    Player.getGameIdByPlayerId(playerId)
        .then(dbRes => {
            res.json({ gameId: dbRes.rows[0].game_id })
        })
        .catch(err => {
            res.json({ err: err.message })
        })

})

router.get('/api/games/names/:player_id'), (req, res) => {
    Answer.singleGameAllWithPlayerNames(req.params.gameId)
        .then(dbRes => {
            res.json(dbRes.rows)
        })
        .catch(err => {
            res.status(500)
                .json({ err: err.message, line: err.line })
        })
}

router.get('/api/games', (req, res) => {
    Game.all()
        .then(dbRes => {
            res.json(dbRes.rows)
        })
        .catch(err => {
            res.status(500)
                .json({ itsNotYou: 'itsMe', message: err.message })
        })
})

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

module.exports = router