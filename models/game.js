const db = require('../db/db')

function all() {
  let sql = 'select * from games;'
  return db.query(sql)
}

function categoriesByGame() {
  let sql = 'SELECT categories.category FROM games INNER JOIN categories ON categories.cat_id = ANY(games.categories) WHERE games.game_id = 1;'

  return db.query(sql)
}

function create(gameName, numRounds, catIds) {
  let sql = "INSERT INTO games (game_name, rounds, categories) values ($1, $2, $3) returning *;"
  return db.query(sql, [gameName, numRounds, catIds])
}

function getGameByName(gameName) {
  let sql = "SELECT * FROM games WHERE game_name=$1;"
  return db.query(sql, [gameName])
}

function getGameById(gameId) {
  let sql = "SELECT * FROM games WHERE game_id=$1;"
  return db.query(sql, [gameId])
}

function deleteGameById(gameId) {
  let sql = "DELETE FROM games WHERE game_id = $1;"
  return db.query(sql, [gameId])
}

module.exports = {
  all,
  categoriesByGame,
  create,
  getGameByName,
  getGameById,
  deleteGameById
}