var mysql = require('mysql');

const config = {
    host: '178.128.37.54',
    user: 'pr226_sa',
    password: 'bounty5Sycamore',
    database: 'pr226_MM_APP'
};

const pool = mysql.createPool(config);

module.exports = pool;