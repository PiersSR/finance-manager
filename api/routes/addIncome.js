var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const app = require('../app');
var pool = require('../data/config');

router.post("/", function(request, response) {
    pool.query("call AddIncome(?, ?, ?, ?)", [ 1, 1, 25.00, 1 ], function(error, result) {
        if (error) {
            response.status(500).json(error.message);
        }

        response.json(result);
    })
});

module.exports = router;