var express = require('express');
const { createPoolCluster } = require('mysql');
var router = express.Router();
var pool = require('../data/config');

router.param('userId', function(request, response, next, id) {
    request.userId = id;
    next();
})

router.param('expenseId', function(request, response, next, id) {
    request.expenseId = id;
    next();
})

router.route('/:userId/:incomeId')
    .all(function(request, response, next) {
        next();
    })
    .delete(function(request, response, next) {
        pool.query("CALL DeleteExpense(?, ?)",
            [
                request.expenseId,
                request.userId
            ],
            function(error, result) {
                if (error) {
                    response.status(400).send({ message: 'Something went wrong whilst deleting an expense: ' + error.message })
                } else {
                    response.status(200).json(result);
                }
            }
        )
    })

router.route('/groups/:userId')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        pool.query("call GetExpensesByCategory(?)",
            request.userId,
            function(error, result) {
                if (error) {
                    response.status(400).send({ message: 'Something went wrong whilst getting expense by category: ' + error.message });
                } else {
                    response.status(200).json(result);
                }
            }
        )
    })

router.route('/:userId')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        pool.query("call GetExpenses(?)",
            request.userId,
            function(error, result) {
                if (error) {
                    response.status(400).send({ message: 'Something went wrong whilst getting an expense: ' + error.message })
                } else {
                    response.status(200).json(result)
                }
            }
        )
    })
    .put(function(request, response, next) {
        const inAmount = parseFloat(request.body.inAmount).toFixed(2);
        
        pool.query("call AddExpense(?, ?, ?, ?)", 
            [
                request.userId,
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
    })
    .post(function(request, response, next) {
        pool.query("CALL EditExpense(?, ?, ?, ?",
            [
                request.body.inExpenseID,
                request.userId,
                request.body.inAmount,
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
    })

module.exports = router;