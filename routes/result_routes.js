var express = require('express')
var router = express.Router()

const Results = require('../models/results.js')
const Players = require('../models/player.js')

router.get('/results', (req, res) => {

  Players.getPlayerById(req.session.user_id)
    .then(dbRes => {
      // var gameId = dbRes.rows[0].game_id
      var gameId = 5
      console.log(gameId)
      
      Results.winners(gameId)
        .then(winnerRes => {
          var winners = winnerRes.rows
          
          Results.losers(gameId)
            .then(loserRes => {
              var losers = loserRes.rows
    
              res.render('results', { gameId, winners, losers })
            })
        })
      
    })


})

module.exports = router
