var express = require('express')
var router = express.Router()

const Players = require('../models/player')

router.get('/api/lobby', (req, res) => {

    let playerId = req.session.user_id

    Players.updateTimeStamp(playerId)
        .then(dbRes => {
            let gameId = dbRes.rows[0].game_id
            return Players.getAllActive(gameId)
        })
        .then(dbRes => {
            let gameId = dbRes.rows[0].game_id
            res.json({ players: dbRes.rows, gameId })
        })
        .catch(err => {
            res.json({ message: err.message })
        })
        
})

router.get('/lobby', (req, res) => {
    res.render('lobby')
})

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

module.exports = router