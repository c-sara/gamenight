var express = require('express')
var router = express.Router()

const Game = require('../models/game')
const Player = require('../models/player')

router.post('/create-game', (req, res) => {

    console.log(req.body)
    var gameName = req.body.gameName
    var displayName = req.body.displayName

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

router.post('/join-game', (req, res) => {

    let displayName = req.body.displayName
    let gameName = req.body.gameName

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

module.exports = router
