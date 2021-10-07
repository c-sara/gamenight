const express = require('express')

var router = express.Router()

const Category = require('../models/category.js')
const Game = require('../models/game.js')
const Player = require('../models/player.js')

const db = require('../db/db')
let session = require('express-session')


function getCategoriesByCat_Id(arrayOfIDs){
    return db.query(`SELECT * FROM categories WHERE cat_id IN (${arrayOfIDs.join(',')});`)
}


router.get('/game', (req, res) => {
    Category.all()
        .then(dbRes => {
            var categoryData = dbRes.rows

            res.render('game', { user_id: req.session.user_id, categoryData })
        })
        .catch(err => {
            res.status(500)
                .json({ itsNotYou: 'itsMe', message: err.message })
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

router.post('/marking-page', (req, res) => {
    //this is req.body = { '1': 'jhjgf', '2': 'sddg', '3': 'hgf', '4': 'waq', '5': 'bnv' }



    //insert the req query as a new record in the results table

    var categoriesAndAnswers = JSON.stringify(req.body)

     //later add game id and filter by it

     //filter by players 


    db.query(`INSERT INTO answers (player_id, player_ans) VALUES ($1, $2);`, [req.session.user_id, categoriesAndAnswers])
        .then(dbRes => {
            return db.query(`SELECT * FROM answers;`)
        })
        .then(dbRes => {
            var answerData = dbRes.rows

            console.log(answerData);
            var cat_IDsInGame = Object.keys(answerData[0].player_ans)
            getCategoriesByCat_Id(cat_IDsInGame)
                .then(dbRes => {
                    // console.log(answerData);
                    var categoryNamesInGame = dbRes.rows
                    res.render('marking-page', { answerData, categoryNamesInGame })
                })
        })
})



module.exports = router