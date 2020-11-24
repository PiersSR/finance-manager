var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('../data/config');

router.get("/", function(request, response) {
    pool.query("call GetFrequencies()", function(error, result) {
        if (error) {
            response.status(500).json(error.message);
        }

        response.status(200).json(result);
    })
});

module.exports = router;