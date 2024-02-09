const Pool = require('pg').Pool;

const pool = new Pool();

exports.query = (text, params, callback) => {
   return pool.query(text, params, callback);
};

exports.query = () => {
   return pool.connect();
};