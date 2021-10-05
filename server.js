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

app.use(express.static('client'))

// assign it in req.body
app.use(express.json())

app.get('/', (req, res) => {

})

app.get('/test', (req, res) => {

  res.send('testing')

})

app.listen(port, () => {
  console.log('listening on port ' + port)
})