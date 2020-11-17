var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.post("/", function(req, res) {
    res.send("addExpense method not yet defined.");
});

module.exports = router;