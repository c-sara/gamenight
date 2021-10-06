const express = require('express')
const engine = require('ejs-mate')
const app = express()
const port = 8080

const Category = require('./models/category.js')
const Game = require('./models/game.js')
const Player = require('./models/player.js')

const { Pool } = require('pg')
const db = new Pool({
    database: 'gamenight',
    password: 'test'
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
    // console.log(req)
    res.render('index')
})

app.get('/join-game', (req, res) => {
    //insert into the players table the display name and generate a session.user id

    //not worrying about game id at this stage (one game mode)

    db.query(`INSERT INTO players (display_name) VALUES ($1) RETURNING *;`, [req.query.displayName], (err, dbRes) => {

        //generate session.user_id
        req.session.user_id = dbRes.rows[0].player_id


        res.redirect('/lobby')
    })
})


app.get('/lobby', (req, res) => {

    db.query(`SELECT * FROM players;`, (err, dbRes) => {

        res.render('lobby')
    })
})




app.get('/api/lobby', (req, res) => {

    db.query(`UPDATE players SET last_request = NOW() WHERE player_id = $1 RETURNING *;`, [req.session.user_id], (err, dbRes) => {

        db.query(`SELECT * FROM players WHERE last_request > NOW() - interval '4 seconds' ORDER BY player_id;`, (err, dbRes) => {

            res.json({ players: dbRes.rows })
        })
    })


})

// app.get('/lobby/:id', (req, res) => {
//   gameName = req.params.id
//   req.session.user_id = 4 // Hard coded session user_id

//   db.query(`SELECT * FROM players WHERE game_id = ${gameName}`, (err, dbRes) => {
//     console.log(dbRes)
//     res.render('lobby', { players: dbRes.rows, user_id: req.session.user_id, gameName: gameName })

//   })

// })

app.get('/game', (req, res) => {
    Game.categoriesByGame()
    .then(dbRes => {
        var gameCategories = dbRes.rows
        
        res.render('game', { user_id: req.session.user_id, gameCategories })
    })
    .catch(err => {
            res.status(500)
                .json({ itsNotYou: 'itsMe', message: err.message })
    })

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

    // console.log(req.session.answers);

    Game.categoriesByGame()
        .then(dbRes => {
            var gameCategories = dbRes.rows
            
            res.render('marking-page', { answers: req.session.answers, gameCategories })
        })
        .catch(err => {
                res.status(500)
                    .json({ itsNotYou: 'itsMe', message: err.message })
        })
})

app.get('/api/games', (req, res) => {
    Game.all()
        .then(dbRes => {
            res.json(dbRes.rows)
        })
        .catch(err => {
            res.status(500)
                .json({ itsNotYou: 'itsMe', message: err.message })
        })
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
                .json({ message: 'success!', category: dbRes.rows[0] })
        })
        .catch(err => {
            res.status(500)
                .json({ thatsOn: 'us', message: err.message })
        })
})

app.listen(port, () => {
    console.log('listening on port ' + port)
})
