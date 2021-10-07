const { Pool } = require('pg')
const db = new Pool({
    database: 'gamenight'
})

function create(displayName, gameId, host = false) {
    let sql = "INSERT INTO players (display_name, game_id, host) values ($1, $2, $3) returning *;"
    return db.query(sql, [displayName, gameId, host])
}

function getAllActive() {
    let sql = "SELECT * FROM players WHERE last_request > NOW() - interval '4 seconds' ORDER BY player_id;"
    return db.query(sql)
}

function updateTimeStamp(player) {
    let sql = `UPDATE players SET last_request = NOW() WHERE player_id = $1 RETURNING *;`
    return db.query(sql, [req.session.user_id])
}

module.exports = {
    create,
    getAllActive,
    updateTimeStamp
}

