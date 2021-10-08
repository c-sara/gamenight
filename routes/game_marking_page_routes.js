const express = require('express')

var router = express.Router()

const Category = require('../models/category.js')
const Game = require('../models/game.js')
const Player = require('../models/player.js')

const db = require('../db/db')
let session = require('express-session')


function getCategoriesByCat_Id(arrayOfIDs) {
    return db.query(`SELECT * FROM categories WHERE cat_id IN (${arrayOfIDs.join(',')});`)
}


router.get('/game/:game_id', (req, res) => {
    var gameId = req.params.game_id
    db.query(`SELECT categories FROM games WHERE game_id = $1`, [gameId])
        .then(dbRes => {
            var categoryIdsArr = dbRes.rows[0].categories
            var categoryIdsStr = categoryIdsArr.toString()
            return db.query(`SELECT * FROM categories WHERE cat_id IN (${categoryIdsStr});`) 
        })
        .then(dbRes => {
            var categoryData = dbRes.rows
            res.render('game', { user_id: req.session.user_id, categoryData, gameId })
        })
})

router.get('/api/games', (req, res) => {
    Game.all()
        .then(dbRes => {
            res.json(dbRes.rows)
        })
        .catch(err => {
            res.status(500)
                .json({ itsNotYou: 'itsMe', message: err.message })
        })
})


//filter by game_id
router.post('/marking-page/:game_id', (req, res) => {

    var gameId = req.params.game_id
    var categoriesAndAnswers = JSON.stringify(req.body)
    console.log(gameId);


    db.query(`INSERT INTO answers (player_id, player_ans) VALUES ($1, $2);`, [req.session.user_id, categoriesAndAnswers])
        .then(dbRes => {
            return db.query('SELECT players.game_id, answers.player_id, answers.player_ans, players.display_name FROM answers INNER JOIN players ON answers.player_id = players.player_id WHERE players.game_id = $1;', [gameId])
            //where game id matches the params

            

        })
        .then(dbRes => {
            var answerData = dbRes.rows


            var cat_IDsInGame = Object.keys(answerData[0].player_ans)
            getCategoriesByCat_Id(cat_IDsInGame)
                .then(dbRes => {
                    // console.log(answerData);
                    var categoryNamesInGame = dbRes.rows
                    res.render('marking-page', { answerData, categoryNamesInGame })
                })
        })
        .catch(err => {
            console.log(err)
        })
})



module.exports = router