var express = require('express')
const db = require('../db/db')
var router = express.Router()

const Game = require('../models/game')
const Player = require('../models/player')
const Category = require('../models/category')
const Answer = require('../models/answers')

router.post('/create-game', (req, res) => {
    
    let gameName = req.body.gameName
    let displayName = req.body.displayName
    let numRounds = req.body.numRounds

    Category.get10RandCategories()
        .then(res => {
            let catIds = Category.convertCategoriesToArr(res.rows)
            return Game.create(gameName, numRounds, catIds)
        })
        .then(dbRes => {
            let gameId = dbRes.rows[0].game_id
            req.session.game_id = gameId
            return Player.create(displayName, gameId, true)
        })
        .then(dbRes => {
            req.session.user_id = dbRes.rows[0].player_id
            res.redirect('/lobby')
        })
        .catch(err => {
            console.log(err.message)
        })
})

router.post('/join-game', (req, res) => {

    let displayName = req.body.displayName
    let gameName = req.body.gameName

    Game.getGameByName(gameName)
        .then(dbRes => {
            let gameId = dbRes.rows[0].game_id
            req.session.game_id = gameId
            return Player.create(displayName, gameId)
        })
        .then(dbRes => {
            req.session.user_id = dbRes.rows[0].player_id
            res.redirect('/lobby')
        })
        .catch(err => {
            console.log(err)
            res.json({err: err.message})
        })

})

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

router.get('/api/games', (req, res) => {
    Game.all()
        .then(dbRes => {
            res.json({games: dbRes.rows})
        })
        .catch(err => {
            res.json({message: err.message})
        })
})

//delete
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
