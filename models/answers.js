const db = require('../db/db')

function all() {
    let sql = "SELECT * FROM answers;"
    return db.query(sql)
}

function singleGameAllWithPlayerNames(gameId) {
    let sql = 'SELECT players.game_id, answers.player_id, answers.player_ans, players.display_name FROM answers INNER JOIN players ON answers.player_id = players.player_id WHERE players.game_id = $1;'
    return db.query(sql, [gameId])
}

function create(gameId, userId, categoriesAndAnswers) {
    let sql = `INSERT INTO answers (game_id, player_id, player_ans) VALUES ($1, $2, $3);`
    return db.query(sql, [gameId, userId, categoriesAndAnswers])
}

function deleteAnswersByGameId(gameId) {
    let sql = 'DELETE FROM answers where game_id = $1;'
    return db.query(sql, [gameId])
}


module.exports = {
    all,
    singleGameAllWithPlayerNames,
    create,
    deleteAnswersByGameId
}