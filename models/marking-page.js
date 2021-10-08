const db = require('../db/db')

function getScores(gameId) {
    let sql = 'SELECT players.player_id, score FROM players INNER JOIN answers ON players.player_id = answers.player_id WHERE players.game_id = $1;'
    return db.query(sql, [gameId])
}

function incrementScore(playerId, instruction) {
    if (instruction === 'increase') {
        var sql = `UPDATE players SET score = score + 1 WHERE player_id = $1;`
    } else {
        var sql = `UPDATE players SET score = score - 1 WHERE player_id = $1;`
    }
    return db.query(sql, [playerId])
}

module.exports = {
    getScores,
    incrementScore
  }