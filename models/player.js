const db = require('../db/db')

function create(displayName, gameId, host = false) {
    let sql = "INSERT INTO players (display_name, game_id, host) values ($1, $2, $3) returning *;"
    return db.query(sql, [displayName, gameId, host])
}

function getAllActive(gameId) {
    let sql = "SELECT * FROM players WHERE last_request >= NOW() - interval '10 seconds' AND game_id = $1 ORDER BY player_id;"
    return db.query(sql, [gameId])
}

function getPlayerById(player_id) {
    let sql = "SELECT * FROM players WHERE player_id = $1;"
    return db.query(sql, [player_id])
}


// SELECT * FROM players WHERE last_request > NOW() - interval '10 seconds';

// UPDATE players SET last_request = NOW() WHERE player_id = 23 RETURNING *;

function updateTimeStamp(player_id) {
    let sql = `UPDATE players SET last_request = NOW() WHERE player_id = $1 RETURNING *;`
    return db.query(sql, [player_id])
}

function updatePlayerReady(player_id) {
    let sql = `UPDATE players SET ready = true WHERE player_id = $1 RETURNING *;`
    return db.query(sql, [player_id])
}

function getAll() {
    let sql = "SELECT * FROM players;"
    return db.query(sql)
}

function deletePlayersByGameId(gameId) {
    let sql = 'DELETE FROM players WHERE game_id = $1;'
    return db.query(sql, [gameId])
}

module.exports = {
    create,
    getAllActive,
    updateTimeStamp,
    getPlayerById,
    updatePlayerReady,
    getAll,
    deletePlayersByGameId
}

