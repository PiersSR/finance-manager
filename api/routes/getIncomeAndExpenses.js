var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.get("/:userID", function(request, response) {
    pool.query("call GetIncomeAndExpenses(?)", 
        request.params.userID,
        function(error, result) {
            if (error) {
                response.status(400).send({ message: 'Something went wrong whilst getting Income and Expenses: ' + error.message });
            } else {
                response.status(200).json(result);
            }
        }
    )
});

module.exports = router;