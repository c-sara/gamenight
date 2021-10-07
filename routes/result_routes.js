var express = require('express')
var router = express.Router()

const Results = require('../models/results.js')

router.get('/results', (req, res) => {

  Results.winners()
    .then(winnerRes => {
      var winners = winnerRes.rows

      Results.losers()
        .then(loserRes => {
          var losers = loserRes.rows

          res.render('results', { winners, losers })
        })
    })

})

module.exports = router
