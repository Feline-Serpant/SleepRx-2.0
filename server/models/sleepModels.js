const { Pool } = require('pg');

const PG_URI = "postgres://jzcfovnf:0TkI805nGVvQMz-ro4bB-3XSCuB1-2kH@queenie.db.elephantsql.com:5432/jzcfovnf"

const pool = new Pool({
    connectionString: PG_URI
}) ;

module.exports = {
  query: (text, params, callback) => {
  return pool.query(text, params, callback)
}}
