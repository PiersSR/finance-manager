var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('../data/config');
const app = require('../app');

router.get("/", function(request, response) {
    pool.query("call GetIncome()", function(error, result) {
        if (error) {
            response.status(500).json(error.message);
        }

        response.json(result);
    })
});

module.exports = router;