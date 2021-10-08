var express = require('express')
const db = require('../db/db')
var router = express.Router()

const Game = require('../models/game')
const Player = require('../models/player')
const Category = require('../models/category')
const Answer = require('../models/answers')

// checks if game exists returns t/f
router.get('/api/games/:gameName', (req, res) => {
    let gameName = req.params.gameName
    Game.getGameByName(gameName)
        .then(dbRes => {
            let exists = dbRes.rows.length > 0 ? true : false 
            res.json({ exists: exists })
        })
        .catch(err => {
            res.json({err: err.message})
        })
})

// renders game page
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

// gets all games
router.get('/api/games', (req, res) => {
    Game.all()
        .then(dbRes => {
            res.json({games: dbRes.rows})
        })
        .catch(err => {
            res.json({message: err.message})
        })
})

// delete
router.delete('/end-game', (req, res) => {
    let gameId = req.query.gameId
    
    Game.deleteGameById(gameId)
    Player.deletePlayersByGameId(gameId)
    Answer.deleteAnswersByGameId(gameId)
        .then(dbRes => {
            res.redirect('/')
        })
        .catch(err => {
            res.json({message: err.message})
        })    
})

module.exports = router
