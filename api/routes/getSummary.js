var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.get("/", function(request, response) {
    pool.query("call GetSummary()", function(error, result) {
        if (error) {
            response.status(500).json(error.message);
        }

        response.json(result);
    })
});

module.exports = router;