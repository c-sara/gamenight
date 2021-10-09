var express = require('express')
var router = express.Router()

const Game = require('../models/game')
const Player = require('../models/player')
const Category = require('../models/category')
const Answer = require('../models/answers')
const Results = require('../models/results')
const MarkingPage = require('../models/marking-page')


// returns winners losers and gameId
router.get('/results', (req, res) => {

  let gameId = req.session.game_id

  Player.getPlayerById(req.session.user_id)
    .then(dbRes => {
      // var gameId = 7 // for testing
      return Results.winners(gameId)
    })
    .then(dbRes => {
      req.session.winners = dbRes.rows
      return Results.losers(gameId)
    })
    .then(dbRes => {
      let losers = dbRes.rows
      let winners = req.session.winners
      res.render('results', { gameId, winners, losers })
    })
    .catch(err => {
      console.log(err)
      res.json({ err: err.message })
    })
})

module.exports = router
