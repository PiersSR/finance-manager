var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const app = require('../app');
var pool = require('../data/config');

router.post("/", (request, response) => {
    var sql = 'INSERT INTO Income (UserID, CategoryID, Amount) VALUES (1, 1, 20.00)';
    
    connection.query(sql);
    response.send(200);
});

module.exports = router;