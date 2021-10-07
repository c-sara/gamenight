var express = require('express')
var router = express.Router()

const Player = require('../models/player')


router.get('/api/players', (req, res) => {
    Player.getAll()
        .then(dbRes => {
            res.json({players: dbRes.rows})
        })
        .catch(err => {
            res.json({message: err.message})
        })
})

router.put('/api/marking-page', (req, res) => {
    //this api call has to be responsible for adding one score into the relevant players record

    //determine whether to plus one or minus one.

    //update the table at the appropriate players score column (by first identifing the player who owns the button's id)

    var instruction = req.body.scoreChange

    if (instruction === 'increase') {
        

    }




    // res.json({ userId: req.session.user_id} )
})

// router.delete('/api/marking-page', (req, res) => {
//     //this api call removes one score from relevant player record

// })






// router.patch('/api/marking-page', (req, res) => {



// })

router.patch('/api/players/:id', (req, res) => {
    let playerId = req.params.id
    Player.updatePlayerReady(playerId)
        .then(dbRes => {
            res.json({ player: "updated" })
        })
        .catch(err => {
            res.json({ message: err.message})
        })
})

module.exports = router