var express = require('express')
var router = express.Router()

const Game = require('../models/game')
const Player = require('../models/player')
const Category = require('../models/category')
const Answer = require('../models/answers')
const Results = require('../models/results')
const MarkingPage = require('../models/marking-page')

// gets all categories
router.get('/categories', (req, res) => {
  Category.all()
      .then(dbRes => {
          res.json(dbRes.rows)
      })
      .catch(err => {
          res.status(500)
              .json({ itsNotYou: 'itsMe', message: err.message })
      })
})

// adds new category
router.post('/categories', (req, res) => {
  let category = req.body.category
  Category.create(category)
      .then(dbRes => {
          res.status(200)
              .json({ message: 'success!', category: dbRes.rows[0] })
      })
      .catch(err => {
          res.status(500)
              .json({ thatsOn: 'us', message: err.message })
      })
})

module.exports = router