var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.get("/", function(req, res) {
    res.send("getExpense method not yet defined.");
});

module.exports = router;