var express = require('express')
var router = express.Router()

const { Pool } = require('pg')
const db = new Pool({
    database: 'gamenight'
})

const Players = require('../models/player')

router.get('/api/lobby', (req, res) => {

    let playerId = req.session.user_id

    Players.updateTimeStamp(playerId)
        .then(dbRes => {
            Players.getAllActive()
                .then(secDbRes => {
                    res.json({ players: secDbRes.rows })
                })
        })
    
    
})

// router.get('/lobby/:id') or
router.get('/lobby/:id', (req, res) => {
    gameName = req.params.id
    req.session.user_id = 4 // Hard coded session user_id
    
    db.query(`SELECT * FROM players WHERE game_id = ${gameName}`, (err, dbRes) => {
        console.log(dbRes)
        res.render('lobby', { players: dbRes.rows, user_id: req.session.user_id, gameName: gameName })
        
    })
})

router.get('/lobby', (req, res) => {

    db.query(`SELECT * FROM players;`, (err, dbRes) => {

        res.render('lobby')
    })
})

module.exports = router