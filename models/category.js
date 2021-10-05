const { Pool } = require('pg')
const db = new Pool({
    database: 'gamenight'
})

function all() {

  let sql = 'select * from categories;'
  return db.query(sql)

}

// returns new inserted category
function create(category) {
  let sql = "INSERT INTO categories (category) values ($1) returning *;"
  return db.query(sql, [category])
}

module.exports = {
  all,
  create
}