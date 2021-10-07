const { Pool } = require('pg')
const db = new Pool({
    database: 'gamenight',
    // password: 'test'
})

function winners(game_id) {
  let sql = 'SELECT * FROM players WHERE score = (SELECT max(score) FROM players) AND game_id = $1;'

  return db.query(sql, [game_id])
}

function losers(game_id) {
  let sql = 'SELECT * FROM players WHERE score != (SELECT max(score) FROM players) AND game_id = $1 ORDER BY score DESC;'

  return db.query(sql, [game_id])
}

module.exports = {
  winners,
  losers
}