const express = require('express')
const engine = require('ejs-mate')
const app = express()
const port = process.env.PORT || 8080

const Category = require('./models/category.js')
const Game = require('./models/game.js')
const Player = require('./models/player.js')
const Results = require('./models/results.js')

const gameAndMarkingPageRoutes = require('./routes/game_marking_page_routes.js')
const categoryRoutes = require('./routes/category_routes.js')
const resultsRoutes = require('./routes/result_routes.js')
const lobbyRoutes = require('./routes/lobby')
const gameRoutes = require('./routes/game_routes')

let session = require('express-session')


app.use(express.static('client'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')


// assign it in req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    key: 'user_sid',
    secret: 'susan swan',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.get('/', (req, res) => {
    // console.log(req)
    res.render('index')
})

app.use('/', lobbyRoutes)
app.use('/', gameRoutes)

app.use(gameAndMarkingPageRoutes)

app.use('/api', categoryRoutes)

app.use('/', resultsRoutes)

app.listen(port, () => {
    console.log('listening on port ' + port)
})
