const { Pool } = require('pg')
const db = new Pool({
    database: 'gamenight',
    // password: 'test'
})

// BELOW RANKS PLAYER BY SCORE
// function scoreBoard() {
//   let sql = 'SELECT * from players WHERE game_id = 1 ORDER BY score DESC;'

//   return db.query(sql)
// }

function winners() {
  let sql = 'SELECT * FROM players WHERE score = (SELECT max(score) FROM players);'

  return db.query(sql)
}

function losers() {
  let sql = 'SELECT * FROM players WHERE score != (SELECT max(score) FROM players) ORDER BY score DESC;'

  return db.query(sql)
}

module.exports = {
  // scoreBoard,
  winners,
  losers
}