var express = require('express')
var router = express.Router()

const { Pool } = require('pg')
const db = new Pool({
    database: 'gamenight'
})

const Game = require('../models/game')
const Player = require('../models/player')


/*
TO DO
-------
In app.get('/host) (called from index.ejs HOSTSIDE)
Using SQL we have inserted host values
Now we need to insert a GAME 
UPDATE the players to add game_id value (or alternatively make GAME first)

.then Figure out
How to parse into the right lobby
eg. localhost:8080/lobby/7
eg. localhost:8080/lobby/gameName
*/

router.get('/host', (req, res) => {
    var gameName = req.query.gameName
    var displayName = req.query.displayName
    Game.create(gameName)
        .then(dbRes => {
            let gameId = dbRes.rows[0].game_id
            Player.create(displayName, gameId, true)
        })
        .catch(err => {
            console.log(err.message)
        })
    res.redirect('/lobby')
})

router.get('/join-game', (req, res) => {

    let displayName = req.query.displayName
    let gameName = req.query.gameName

    Game.getGameByName(gameName)
        .then(dbRes => {
            let gameId = dbRes.rows[0].game_id
            Player.create(displayName, gameId)
                .then(secDbRes => {
                    req.session.user_id = secDbRes.rows[0].player_id

                    res.redirect('/lobby')
                })
        })

})

module.exports = router
