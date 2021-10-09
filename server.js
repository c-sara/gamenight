const express = require('express')
const engine = require('ejs-mate')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 8080

const Category = require('./models/category.js')
const Game = require('./models/game.js')
const Player = require('./models/player.js')
const Results = require('./models/results.js')

const markingPageRoutes = require('./routes/marking_page_routes.js')
const categoryRoutes = require('./routes/category_routes.js')
const resultsRoutes = require('./routes/result_routes.js')
const lobbyRoutes = require('./routes/lobby_routes')
const gameRoutes = require('./routes/game_routes')
const playerRoutes = require('./routes/player_routes')
const answerRoutes = require('./routes/answers_routes')

let session = require('express-session')


app.use(express.static('client'))
app.use(methodOverride('_method'))
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

app.use('/', markingPageRoutes)
app.use('/', lobbyRoutes)
app.use('/', gameRoutes)
app.use('/', playerRoutes)
app.use('/', answerRoutes)
app.use('/', resultsRoutes)
app.use('/api', categoryRoutes)

app.listen(port, () => {
    console.log('listening on port ' + port)
})

