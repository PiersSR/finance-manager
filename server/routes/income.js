var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.param('userId', function(request, response, next, id) {
    request.userId = id;
    next();
})

router.param('incomeId', function(request, response, next, id) {
    request.incomeId = id;
    next();
})

router.route('/:userId/:incomeId')
    .all(function(request, response, next) {
        next();
    })
    .post(function(request, response, next) {
        pool.query("CALL EditIncome(?, ?, ?, ?, ?)",
            [
                request.incomeId,
                request.userId,
                request.body.inAmount,
                request.body.inCategoryID,
                request.body.inFrequencyID
            ],
            function(error, result) {
                if (error) {
                    response.status(401).send( { message: 'Something went wrong whilst editing an income: ' + error.message });
                } else {
                    response.status(201).json(result);
                }
            }
        )
    })
    .delete(function(request, response, next) {
        pool.query("CALL DeleteIncome(?, ?)",
            [
                request.incomeId,
                request.userId
            ],
            function(error, result) {
                if (error) {
                    response.status(401).send({ message: 'Something went wrong whilst deleting an income: ' + error.message })
                } else {
                    response.status(201).json(result);
                }
            }
        )
    })

router.route('/groups/:userId')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        pool.query("call GetIncomeByCategory(?)",
            request.userId, 
            function(error, result) {
                if (error) {
                    response.status(401).send({ message: 'Something went wrong whilst getting income by category: ' + error.message });
                } else {
                    response.status(201).json(result);
                }
            }
        )
    })

router.route('/:userId')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        pool.query("call GetIncome(?)",
            request.userId, 
            function(error, result) {
                if (error) {
                    response.status(401).send({ message: 'Something went wrong whilst getting income: ' + error.message });
                } else {
                    response.status(201).json(result);
                }
            }
        )
    })
    .put(function(request, response, next) {
        pool.query("call AddIncome(?, ?, ?, ?)", 
            [
                request.userId,
                request.body.inCategoryID,
                request.body.inAmount,
                request.body.inFrequencyID
            ],
            function(error, result) {
                if (error) {
                    response.status(401).send({ message: 'Something went wrong whilst adding an income: ' + error.message })
                } else {
                    response.status(201).json(result);
                }
            }
        )
    })

module.exports = router;