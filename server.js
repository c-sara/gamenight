const express = require('express')
const engine = require('ejs-mate')
const app = express()
const port = 8080

const Category = require('./models/category.js')
const Game = require('./models/game.js')
const Player = require('./models/player.js')

const { Pool } = require('pg')
const db = new Pool({
  database: 'gamenight'
})

let session = require('express-session')
// const { LineController } = require('chart.js')

app.use(express.static('client'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')

// assign it in req.body
app.use(express.json())
app.use(session({
  secret: 'susan swan',
  resave: true,
  saveUninitialized: true
}))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/game', (req, res) => {
  req.session.user_id = 4
  res.render('game', { user_id: req.session.user_id })
})

app.get('/marking-page', (req, res) => {
  // have to check if user_id already has answers
  // not sure of the best way to go on it
  if (req.session.answers) {
    req.session.answers.push(req.query)
  } else {
    req.session.answers = []
    req.session.answers.push(req.query)
  }
  res.render('marking-page', { answers: req.session.answers })
})

app.get('/api/categories', (req, res) => {
  Category.all()
    .then(dbRes => {
      res.json(dbRes.rows)
    })
    .catch(err => {
      res.status(500)
        .json({ itsNotYou: 'itsMe', message: err.message })
    })
})

// new category sent through body
// I have no preference on this just did it this way :)
app.post('/api/categories', (req, res) => {
  let category = req.body.category
  Category.create(category)
    .then(dbRes => {
      res.status(200)
        .json({message: 'success!', category: dbRes.rows[0]})
    })
    .catch(err => {
      res.status(500)
        .json({ thatsOn: 'us', message: err.message})
    })
})

app.listen(port, () => {
  console.log('listening on port ' + port)
})

//Potato
//Extra potato