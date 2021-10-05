const { Pool } = require('pg')
const db = new Pool({
    database: 'gamenight'
})

function all() {
  let sql = 'select * from categories;'

  return db.query(sql)
}

module.exports = {
  all,
}