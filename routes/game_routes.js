var express = require('express')
var router = express.Router()

const Game = require('../models/game')
const Player = require('../models/player')

router.get('/create-game', (req, res) => {
    var gameName = req.query.gameName
    var displayName = req.query.displayName
    Game.create(gameName)
        .then(dbRes => {
            let gameId = dbRes.rows[0].game_id
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

router.get('/join-game', (req, res) => {

    let displayName = req.query.displayName
    let gameName = req.query.gameName

    Game.getGameByName(gameName)
        .then(dbRes => {
            let gameId = dbRes.rows[0].game_id
            return Player.create(displayName, gameId)
        })
        .then(dbRes => {
            req.session.user_id = dbRes.rows[0].player_id
            res.redirect('/lobby')
        })
        .catch(err => {
            console.log('oi')
            console.log(err.message)
        })

})

module.exports = router
