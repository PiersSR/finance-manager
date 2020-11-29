var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.param('userId', function(request, response, next, id) {
    request.userId = id;
    next();
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
        next(new Error('Post method not implemented'))
    })
    .delete(function(request, response, next) {
        next(new Error('Delete method not implemented'));
    })

module.exports = router;