const express = require('express')
const app = express()
const port = 8080

const Category = require('./models/category.js')
const Game = require('./models/game.js')
const Player = require('./models/player.js')

const { Pool } = require('pg')
const db = new Pool({
  database: 'gamenight'
})

var session = require('express-session')

app.use(express.static('client'))
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
  res.render('marking-page', { answers: req.query })
})

app.listen(port, () => {
  console.log('listening on port ' + port)
})

//Potato