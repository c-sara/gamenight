const db = require('../db/db')

function all() {
  let sql = 'select * from categories;'
  return db.query(sql)
}

// returns new inserted category
function create(category) {
  let sql = "INSERT INTO categories (category) values ($1) returning *;"
  return db.query(sql, [category])
}

function get10RandCategories() {
  let sql = `SELECT * FROM categories
  ORDER BY RANDOM()
  LIMIT 10;`
  return db.query(sql)
}

function getCategoriesByCatId(arrayOfIDs) {
  let sql = `SELECT * FROM categories WHERE cat_id IN (${arrayOfIDs.join(',')});`
  return db.query(sql)
}

function convertCategoriesToArr(arrOfObjs) {
  return arrOfObjs.map(category => category.cat_id)
}

function getCategoriesByGameId(gameId) {
  let sql = `SELECT categories FROM games WHERE game_id = $1;`
  return db.query(sql, [gameId])
}


module.exports = {
  all,
  create,
  get10RandCategories,
  convertCategoriesToArr,
  getCategoriesByCatId,
  getCategoriesByGameId
}