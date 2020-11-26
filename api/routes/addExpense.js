var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.post("/", function(request, response) {
    const inAmount = parseFloat(request.body.inAmount).toFixed(2);
    
    pool.query("call AddExpense(?, ?, ?, ?)", 
        [
            request.body.inUserID,
            request.body.inCategoryID,
            inAmount,
            request.body.inFrequencyID
        ],
        function(error, result) {
            if (error) {
                response.status(400).send( { message: 'Something went wrong whilst adding an expense: ' + error.message });
            } else {
                response.status(200).json(result);
            }
        }
    )
});

module.exports = router;