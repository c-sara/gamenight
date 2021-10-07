const db = require('../db/db')

function all() {
  let sql = 'select * from games;'
  return db.query(sql)
}

function addPointInPlayerTable(value, player_id){
  db.query(`UPDATE players SET score = score + $1 WHERE player_id = $2;`, [value, player_id])
}


//where game_id matches the game
function returnPlayersPoints() {
  let sql = `SELECT players_id, score FROM players;`
  return db.query(sql)
}

function categoriesByGame() {
  let sql = 'SELECT categories.category FROM games INNER JOIN categories ON categories.cat_id = ANY(games.categories) WHERE games.game_id = 1;'

  return db.query(sql)
}

function create(gameName) {
  let sql = "INSERT INTO games (game_name) values ($1) returning *;"
  return db.query(sql, [gameName])
}

function getGameByName(gameName) {
  let sql = "SELECT * FROM games WHERE game_name=$1;"
  return db.query(sql, [gameName])
}

function getGameById(gameId) {
  let sql = "SELECT * FROM games WHERE game_id=$1;"
  return db.query(sql, [gameId])
}

module.exports = {
  all,
  categoriesByGame,
  create,
  getGameByName,
  getGameById
}