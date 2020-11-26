var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.post("/", function(request, response) {
    pool.query("call DeleteIncome(?)", 
        request.body.id,
        function(error, result) {
            if (error) {
                response.status(400).send({ message: 'Something went wrong whilst deleting an income: ' + error.message });
            } else {
                response.json(result);
            }
        }
    )
});

module.exports = router;