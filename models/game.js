const { Pool } = require('pg')
const db = new Pool({
    database: 'gamenight'
})

function all() {

  let sql = 'select * from games;'
  return db.query(sql)

}

function categoriesByGame() {
  let sql = 'SELECT categories.category FROM games INNER JOIN categories ON categories.cat_id = ANY(games.categories) WHERE games.game_id = 1;'

  return db.query(sql)
}

module.exports = {
  all,
  categoriesByGame
}