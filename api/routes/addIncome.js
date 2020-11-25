var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const app = require('../app');
var pool = require('../data/config');

router.post("/", function(request, response) {
    const inUserID = request.body.inUserID;
    const inCategoryID = request.body.inCategoryID;
    const inAmount = parseFloat(request.body.inAmount).toFixed(2);
    const inFrequencyID = request.body.inFrequencyID;
    console.log(inAmount);
    pool.query("call AddIncome(?, ?, ?, ?)", [ inUserID, inCategoryID, inAmount, inFrequencyID ], function(error, result) {
        if (error) {
            response.status(500).json(error.message.toString());
        }

        response.json(result);
    })
});

module.exports = router;