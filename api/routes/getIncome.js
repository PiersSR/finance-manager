var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('../data/config');
const app = require('../app');

router.get("/", function(request, response) {
    pool.query('SELECT Amount FROM Income WHERE UserID = ?', 1, (error, result) => {
        if (error) throw error;

        response.json(result);
    });
});

module.exports = router;